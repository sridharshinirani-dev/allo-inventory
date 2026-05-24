"use client";

import { useEffect, useState } from "react";

export default function Home() {

// =========================
// STATES
// =========================

const [products, setProducts] =
useState<any[]>([]);

const [reservations,
setReservations] =
useState<any[]>([]);

const [inventory,
setInventory] =
useState<any[]>([]);

const [warehouses,
setWarehouses] =
useState<any[]>([]);

// =========================
// PRODUCT STATES
// =========================

const [name, setName] =
useState("");

const [category,
setCategory] =
useState("");

const [quantity,
setQuantity] =
useState("");

const [price,
setPrice] =
useState("");

// =========================
// RESERVATION STATES
// =========================

const [selectedProduct,
setSelectedProduct] =
useState("");

const [reserveQuantity,
setReserveQuantity] =
useState("");

const [expiryDate,
setExpiryDate] =
useState("");

// =========================
// WAREHOUSE STATES
// =========================

const [warehouseName,
setWarehouseName] =
useState("");

const [warehouseLocation,
setWarehouseLocation] =
useState("");

const [showWarehouse,
setShowWarehouse] =
useState(true);

// =========================
// INVENTORY STATES
// =========================

const [
selectedInventoryProduct,

setSelectedInventoryProduct

] = useState("");

const [
selectedWarehouse,

setSelectedWarehouse

] = useState("");

const [stock, setStock] =
useState("");

// =========================
// SEARCH
// =========================

const [search,
setSearch] =
useState("");

// =========================
// FETCH PRODUCTS
// =========================

const fetchProducts =
async () => {

const res =  
  await fetch(  
    "/api/products"  
  );  

const data =  
  await res.json();  

setProducts(data);

};

// =========================
// FETCH RESERVATIONS
// =========================

const fetchReservations =
async () => {

const res =  
  await fetch(  
    "/api/reservations"  
  );  

const data =  
  await res.json();  

setReservations(data);

};

// =========================
// FETCH INVENTORY
// =========================

const fetchInventory =
async () => {

const res =  
  await fetch(  
    "/api/inventory"  
  );  

const data =  
  await res.json();  

setInventory(data);

};

// =========================
// FETCH WAREHOUSES
// =========================

const fetchWarehouses =
async () => {

const res =  
  await fetch(  
    "/api/warehouses"  
  );  

const data =  
  await res.json();  

setWarehouses(data);

};

// =========================
// LOAD DATA
// =========================

useEffect(() => {

fetchProducts();  

fetchReservations();  

fetchInventory();  

fetchWarehouses();

}, []);

// =========================
// AUTO REFRESH TIMER
// =========================

useEffect(() => {

const timer =  
  setInterval(() => {  

    fetchReservations();  

  }, 1000);  

return () =>  
  clearInterval(timer);

}, []);

// =========================
// ADD PRODUCT
// =========================

const addProduct =
async () => {

await fetch(  
  "/api/products",  
  {  
    method: "PUT",  

    headers: {  
      "Content-Type":  
        "application/json",  
    },  

    body: JSON.stringify({  
      name,  
      category,  

      quantity:  
        Number(quantity),  

      price:  
        Number(price),  
    }),  
  }  
);  

setName("");  
setCategory("");  
setQuantity("");  
setPrice("");  

fetchProducts();

};

// =========================
// RESERVE PRODUCT
// =========================

const reserveProduct =
async () => {

const currentDate =  
  new Date();  

const selectedDate =  
  new Date(expiryDate);  

// 410 VALIDATION  

if (  
  selectedDate <  
  currentDate  
) {  

  alert(  
    "Reservation expired"  
  );  

  return;  
}  

const res =  
  await fetch(  
    "/api/reservations",  
    {  
      method: "POST",  

      headers: {  
        "Content-Type":  
          "application/json",  
      },  

      body: JSON.stringify({  
        productId:  
          Number(  
            selectedProduct  
          ),  

        quantity:  
          Number(  
            reserveQuantity  
          ),  

        expiresAt:  
          expiryDate,  
      }),  
    }  
  );  

// 409 ERROR  

if (  
  res.status === 409  
) {  

  alert(  
    "Not enough stock available"  
  );  

  return;  
}  

// 410 ERROR  

if (  
  res.status === 410  
) {  

  alert(  
    "Reservation expired"  
  );  

  return;  
}  

alert(  
  "Reservation created successfully"  
);  

setSelectedProduct("");  

setReserveQuantity("");  

setExpiryDate("");  

fetchProducts();  

fetchReservations();

};

// =========================
// ADD WAREHOUSE
// =========================

const addWarehouse =
async () => {

await fetch(  
  "/api/warehouses",  
  {  
    method: "POST",  

    headers: {  
      "Content-Type":  
        "application/json",  
    },  

    body: JSON.stringify({  
      name: warehouseName,  

      location:  
        warehouseLocation,  
    }),  
  }  
);  

setWarehouseName("");  

setWarehouseLocation("");  

fetchWarehouses();

};

// =========================
// ADD INVENTORY
// =========================

const addInventory =
async () => {

await fetch(  
  "/api/inventory",  
  {  
    method: "POST",  

    headers: {  
      "Content-Type":  
        "application/json",  
    },  

    body: JSON.stringify({  
      productId:  
        Number(  
          selectedInventoryProduct  
        ),  

      warehouseId:  
        Number(  
          selectedWarehouse  
        ),  

      stock:  
        Number(stock),  
    }),  
  }  
);  

setSelectedInventoryProduct("");  

setSelectedWarehouse("");  

setStock("");  

fetchInventory();

};
const confirmReservation =
async (id: number) => {

  await fetch(
    `/api/reservations/${id}/confirm`,
    {
      method: "POST",
    }
  );

  fetchReservations();
};
// =========================
// FILTER PRODUCTS
// =========================

const filteredProducts =
products.filter(
(product: any) =>
product.name
.toLowerCase()
.includes(
search.toLowerCase()
)
);

// =========================
// TOTAL STOCK
// =========================

const totalStock =
inventory.reduce(
(
total: number,
item: any
) => total + item.stock,
0
);

// =========================
// UI
// =========================

return (

<main className="p-10 bg-gray-100 min-h-screen">  

  {/* TITLE */}  

  <h1 className="text-5xl font-bold text-center text-blue-600 mb-12">  
    Inventory Management System  
  </h1>  

  {/* DASHBOARD */}  

  <div className="grid grid-cols-4 gap-6 mb-10">  

    <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg">  
      <h2 className="text-2xl font-bold">  
        Products  
      </h2>  

      <p className="text-5xl mt-4">  
        {products.length}  
      </p>  
    </div>  

    <div className="bg-green-600 text-white p-8 rounded-xl shadow-lg">  
      <h2 className="text-2xl font-bold">  
        Reservations  
      </h2>  

      <p className="text-5xl mt-4">  
        {reservations.length}  
      </p>  
    </div>  

    <div className="bg-purple-600 text-white p-8 rounded-xl shadow-lg">  
      <h2 className="text-2xl font-bold">  
        Inventory  
      </h2>  

      <p className="text-5xl mt-4">  
        {inventory.length}  
      </p>  
    </div>  

    <div className="bg-orange-600 text-white p-8 rounded-xl shadow-lg">  
      <h2 className="text-2xl font-bold">  
        Total Stock  
      </h2>  

      <p className="text-5xl mt-4">  
        {totalStock}  
      </p>  
    </div>  

  </div>  

  {/* ADD PRODUCT */}  

  <div className="bg-white border p-8 rounded-xl shadow-lg mb-10">  

    <h2 className="text-3xl font-bold text-blue-700 mb-6">  
      Add Product  
    </h2>  

    <div className="grid grid-cols-2 gap-4">  

      <input  
        type="text"  
        placeholder="Product Name"  
        className="border p-4 rounded-lg"  
        value={name}  
        onChange={(e) =>  
          setName(e.target.value)  
        }  
      />  

      <input  
        type="text"  
        placeholder="Category"  
        className="border p-4 rounded-lg"  
        value={category}  
        onChange={(e) =>  
          setCategory(  
            e.target.value  
          )  
        }  
      />  

      <input  
        type="number"  
        placeholder="Quantity"  
        className="border p-4 rounded-lg"  
        value={quantity}  
        onChange={(e) =>  
          setQuantity(  
            e.target.value  
          )  
        }  
      />  

      <input  
        type="number"  
        placeholder="Price"  
        className="border p-4 rounded-lg"  
        value={price}  
        onChange={(e) =>  
          setPrice(  
            e.target.value  
          )  
        }  
      />  

    </div>  

    <button  
      onClick={addProduct}  
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg mt-6"  
    >  
      Add Product  
    </button>  

  </div>  

  {/* ADD WAREHOUSE */}  

  <div className="bg-white border p-8 rounded-xl shadow-lg mb-10">  

    <div className="flex justify-between mb-6">  

      <h2 className="text-3xl font-bold text-purple-700">  
        Add Warehouse  
      </h2>  

      <button  
        onClick={() =>  
          setShowWarehouse(  
            !showWarehouse  
          )  
        }  
        className="bg-purple-700 text-white px-4 py-2 rounded-lg"  
      >  
        {showWarehouse  
          ? "Hide"  
          : "Show"}  
      </button>  

    </div>  

    {showWarehouse && (  
      <>  

        <div className="grid grid-cols-2 gap-4">  

          <input  
            type="text"  
            placeholder="Warehouse Name"  
            className="border p-4 rounded-lg"  
            value={warehouseName}  
            onChange={(e) =>  
              setWarehouseName(  
                e.target.value  
              )  
            }  
          />  

          <input  
            type="text"  
            placeholder="Location"  
            className="border p-4 rounded-lg"  
            value={warehouseLocation}  
            onChange={(e) =>  
              setWarehouseLocation(  
                e.target.value  
              )  
            }  
          />  

        </div>  

        <button  
          onClick={addWarehouse}  
          className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg mt-6"  
        >  
          Add Warehouse  
        </button>  

      </>  
    )}  

  </div>  

  {/* SEARCH */}  

  <input  
    type="text"  
    placeholder="Search Product..."  
    className="w-full border p-4 rounded-lg mb-10"  
    value={search}  
    onChange={(e) =>  
      setSearch(e.target.value)  
    }  
  />  

  {/* PRODUCTS TABLE */}  

  <table className="w-full border bg-white rounded-xl overflow-hidden shadow-lg mb-10">  

    <thead className="bg-blue-700 text-white">  

      <tr>  
        <th className="p-4">ID</th>  
        <th className="p-4">Product</th>  
        <th className="p-4">Category</th>  
        <th className="p-4">Quantity</th>  
        <th className="p-4">Price</th>  
      </tr>  

    </thead>  

    <tbody>  

      {filteredProducts.map(  
        (product: any) => (  

          <tr  
            key={product.id}  
            className="border-b text-center"  
          >  

            <td className="p-4">  
              {product.id}  
            </td>  

            <td className="p-4">  
              {product.name}  
            </td>  

            <td className="p-4">  
              {product.category}  
            </td>  

            <td className="p-4">  
              {product.quantity}  
            </td>  

            <td className="p-4">  
              ₹ {product.price}  
            </td>  

          </tr>  
        )  
      )}  

    </tbody>  

  </table>  

  {/* CREATE RESERVATION */}  

  <div className="bg-white border p-8 rounded-xl shadow-lg mb-10">  

    <h2 className="text-3xl font-bold text-green-700 mb-6">  
      Create Reservation  
    </h2>  

    <div className="grid grid-cols-3 gap-4">  

      <select  
        className="border p-4 rounded-lg"  
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

        {products.map(  
          (product: any) => (  

            <option  
              key={product.id}  
              value={product.id}  
            >  
              {product.name}  
            </option>  
          )  
        )}  

      </select>  

      <input  
        type="number"  
        placeholder="Reservation Quantity"  
        className="border p-4 rounded-lg"  
        value={reserveQuantity}  
        onChange={(e) =>  
          setReserveQuantity(  
            e.target.value  
          )  
        }  
      />  

      <input  
        type="date"  
        className="border p-4 rounded-lg"  
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
      className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg mt-6"  
    >  
      Reserve Product  
    </button>  

  </div>  

 {/* RESERVATION TABLE */}

<table className="w-full border bg-white rounded-xl overflow-hidden shadow-lg mb-10">

  <thead className="bg-green-700 text-white">

    <tr>

      <th className="p-4">ID</th>

      <th className="p-4">Product</th>

      <th className="p-4">Quantity</th>

      <th className="p-4">Status</th>

      <th className="p-4">Expiry</th>

      <th className="p-4">Actions</th>

    </tr>

  </thead>

  <tbody>

    {reservations.map(

      (reservation: any) => (

        <tr

          key={reservation.id}

          className="border-b text-center"

        >

          <td className="p-4">

            {reservation.id}

          </td>

          <td className="p-4">

            {

              reservation.product

                ?.name

            }

          </td>

          <td className="p-4">

            {

              reservation.quantity

            }

          </td>

          <td

            className={`p-4 font-bold ${

              reservation.status ===

              "confirmed"

                ? "text-green-600"

                : reservation.status ===

                  "released"

                ? "text-red-600"

                : "text-yellow-600"

            }`}

          >

            {

              reservation.status

            }

          </td>

          <td className="p-4">

            {new Date(

              reservation.expiresAt

            ).toLocaleDateString()}

            <div className="text-sm text-gray-500 mt-1">

              {Math.max(

                0,

                Math.floor(

                  (

                    new Date(

                      reservation.expiresAt

                    ).getTime()

                    -

                    new Date().getTime()

                  )

                  /

                  1000

                )

              )} sec left

            </div>

          </td>

          <td className="p-4">

            {reservation.status ===

            "pending" && (

              <button

                onClick={async () => {

  await fetch(

    `/api/reservations/${reservation.id}`,

    {

      method: "PUT",

    }

  );

  fetchReservations();

}}

                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

              >

                Confirm

              </button>

            )}

          </td>

        </tr>

      )

    )}

  </tbody>

</table>

  {/* ADD INVENTORY */}  

  <div className="bg-white border p-8 rounded-xl shadow-lg mb-10">  

    <h2 className="text-3xl font-bold text-purple-700 mb-6">  
      Add Inventory  
    </h2>  

    <div className="grid grid-cols-3 gap-4">  

      <select  
        className="border p-4 rounded-lg"  
        value={  
          selectedInventoryProduct  
        }  
        onChange={(e) =>  
          setSelectedInventoryProduct(  
            e.target.value  
          )  
        }  
      >  

        <option value="">  
          Select Product  
        </option>  

        {products.map(  
          (product: any) => (  

            <option  
              key={product.id}  
              value={product.id}  
            >  
              {product.name}  
            </option>  
          )  
        )}  

      </select>  

      <select  
        className="border p-4 rounded-lg"  
        value={selectedWarehouse}  
        onChange={(e) =>  
          setSelectedWarehouse(  
            e.target.value  
          )  
        }  
      >  

        <option value="">  
          Select Warehouse  
        </option>  

        {warehouses.map(  
          (warehouse: any) => (  

            <option  
              key={warehouse.id}  
              value={warehouse.id}  
            >  
              {warehouse.name}  
            </option>  
          )  
        )}  

      </select>  

      <input  
        type="number"  
        placeholder="Stock"  
        className="border p-4 rounded-lg"  
        value={stock}  
        onChange={(e) =>  
          setStock(  
            e.target.value  
          )  
        }  
      />  

    </div>  

    {/* WAREHOUSE TABLE */}

<div className="bg-white border p-8 rounded-xl shadow-lg mb-10">

  <h2 className="text-3xl font-bold text-purple-700 mb-6">
    Warehouse Details
  </h2>

  <table className="w-full border">

    <thead className="bg-purple-700 text-white">

      <tr>
        <th className="p-4">ID</th>
        <th className="p-4">Name</th>
        <th className="p-4">Location</th>
      </tr>

    </thead>

    <tbody>

      {warehouses.map((warehouse: any) => (

        <tr
          key={warehouse.id}
          className="border-b text-center"
        >

          <td className="p-4">
            {warehouse.id}
          </td>

          <td className="p-4">
            {warehouse.name}
          </td>

          <td className="p-4">
            {warehouse.location}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

{/* INVENTORY TABLE */}

<div className="bg-white border p-8 rounded-xl shadow-lg mb-10">

  <h2 className="text-3xl font-bold text-blue-700 mb-6">
    Inventory Details
  </h2>

  <table className="w-full border">

    <thead className="bg-blue-700 text-white">

      <tr>
        <th className="p-4">ID</th>
        <th className="p-4">Product</th>
        <th className="p-4">Warehouse</th>
        <th className="p-4">Stock</th>
      </tr>

    </thead>

    <tbody>

      {inventory.map((item: any) => (

        <tr
          key={item.id}
          className="border-b text-center"
        >

          <td className="p-4">
            {item.id}
          </td>

          <td className="p-4">
            {item.product?.name}
          </td>

          <td className="p-4">
            {item.warehouse?.name}
          </td>

          <td className="p-4">
            {item.stock}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

    <button  
      onClick={addInventory}  
      className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg mt-6"  
    >  
      Add Inventory  
    </button>  

  </div>  

</main>

);
}