"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [reserveQuantity, setReserveQuantity] =
    useState("");

  const [expiryDate, setExpiryDate] =
    useState("");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("/api/products");

    const data = await res.json();

    setProducts(data);
  };

  // FETCH RESERVATIONS
  const fetchReservations = async () => {
    const res = await fetch(
      "/api/reservations"
    );

    const data = await res.json();

    setReservations(data);
  };

  // FETCH INVENTORY
  const fetchInventory = async () => {
    const res = await fetch("/api/inventory");

    const data = await res.json();

    setInventory(data);
  };

  // LOAD DATA
  useEffect(() => {
    fetchProducts();
    fetchReservations();
    fetchInventory();
  }, []);

  // ADD PRODUCT
  const addProduct = async () => {
    await fetch("/api/products", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        category,
        quantity: Number(quantity),
        price: Number(price),
      }),
    });

    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");

    fetchProducts();
  };

  // RESERVE PRODUCT
  const reserveProduct = async () => {
    await fetch("/api/reservations", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        productId: Number(
          selectedProduct
        ),

        quantity: Number(
          reserveQuantity
        ),

        expiresAt: expiryDate,
      }),
    });

    setSelectedProduct("");
    setReserveQuantity("");
    setExpiryDate("");

    fetchProducts();
    fetchReservations();
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Inventory Management System
      </h1>

      {/* ADD PRODUCT */}

      <div className="border p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Add Product
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Quantity"
            className="border p-3 rounded"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />
        </div>

        <button
          onClick={addProduct}
          className="bg-blue-600 text-white px-6 py-3 rounded mt-6"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT TABLE */}

      <table className="w-full border mb-10">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>{product.quantity}</td>

              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* RESERVATION */}

      <div className="border p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Create Reservation
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <select
            className="border p-3 rounded"
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(
                e.target.value
              )
            }
          >
            <option value="">
              Select Product
            </option>

            {products.map((product: any) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Reservation Quantity"
            className="border p-3 rounded"
            value={reserveQuantity}
            onChange={(e) =>
              setReserveQuantity(
                e.target.value
              )
            }
          />

          <input
            type="date"
            className="border p-3 rounded"
            value={expiryDate}
            onChange={(e) =>
              setExpiryDate(
                e.target.value
              )
            }
          />
        </div>

        <button
          onClick={reserveProduct}
          className="bg-green-700 text-white px-6 py-3 rounded mt-6"
        >
          Reserve Product
        </button>
      </div>

      {/* RESERVATION TABLE */}

      <table className="w-full border mb-10">
        <thead className="bg-green-700 text-white">
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.length > 0 ? (
            reservations.map(
              (reservation: any) => (
                <tr
                  key={reservation.id}
                >
                  <td>
                    {reservation.id}
                  </td>

                  <td>
                    {reservation.product
                      ? reservation
                          .product.name
                      : "No Product"}
                  </td>

                  <td>
                    {
                      reservation.quantity
                    }
                  </td>

                  <td>
                    {reservation.status}
                  </td>

                  <td>
                    {new Date(
                      reservation.expiresAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {reservation.status ===
                      "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            await fetch(
                              `/api/reservations/${reservation.id}`,
                              {
                                method:
                                  "PATCH",

                                headers:
                                  {
                                    "Content-Type":
                                      "application/json",
                                  },

                                body: JSON.stringify(
                                  {
                                    status:
                                      "confirmed",
                                  }
                                ),
                              }
                            );

                            fetchReservations();
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={async () => {
                            await fetch(
                              `/api/reservations/${reservation.id}`,
                              {
                                method:
                                  "PATCH",

                                headers:
                                  {
                                    "Content-Type":
                                      "application/json",
                                  },

                                body: JSON.stringify(
                                  {
                                    status:
                                      "released",
                                  }
                                ),
                              }
                            );

                            fetchProducts();

                            fetchReservations();
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Release
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={6}>
                No Reservations Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* INVENTORY TABLE */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Inventory Details
        </h2>

        <table className="w-full border">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Warehouse</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>
                  {item.product?.name}
                </td>

                <td>
                  {item.warehouse?.name}
                </td>

                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}