"use client";

import { useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      quantity: 10,
      price: 55000,
      status: "Available",
    },
    {
      id: 2,
      name: "Mouse",
      category: "Accessories",
      quantity: 20,
      price: 500,
      status: "Available",
    },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = () => {
    if (!name || !category || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name,
      category,
      quantity: Number(quantity),
      price: Number(price),
      status: "Available",
    };

    setProducts([...products, newProduct]);

    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  };

  const reserveProduct = (id: number) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          status: "Reserved",
        };
      }

      return product;
    });

    setProducts(updatedProducts);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <h1 className="text-5xl font-bold text-center text-blue-700 mb-10">
        Inventory Management System
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">
          Add Product
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            className="border p-3 rounded-xl"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded-xl"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          onClick={addProduct}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <th className="p-4">ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Reserve</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="text-center border-b hover:bg-gray-100"
              >
                <td className="p-4">{product.id}</td>

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.quantity}</td>

                <td className="p-4 text-green-600 font-bold">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  <span
                    className={`px-4 py-2 rounded-full text-white ${
                      product.status === "Available"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => reserveProduct(product.id)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                  >
                    Reserve
                  </button>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}