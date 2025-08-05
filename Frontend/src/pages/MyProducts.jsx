import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const sampleProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    image:
      "https://theworldonaplatter.com/wp-content/uploads/2020/08/tomato-basket-912.jpg",
    quantity: 50,
    price: 20,
    lastUpdated: "2025-08-01",
  },
  {
    id: 2,
    name: "Organic Milk",
    image:
      "https://thumbs.dreamstime.com/b/fresh-organic-milk-nature-background-49456608.jpg",
    quantity: 5,
    price: 40,
    lastUpdated: "2025-08-03",
  },
  {
    id: 3,
    name: "Apples",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=100&q=80",
    quantity: 0,
    price: 25,
    lastUpdated: "2025-08-02",
  },
];
const getStock = (qty) => {
  if (qty === 0) return "Out of Stock";
  if (qty < 5) return "Low Stock";
  return "In Stock";
};
const getStockColor = (qty) => {
  if (qty === 0) return "bg-red-100 text-red-600";
  if (qty < 5) return "bg-yellow-100 text-yellow-600";
  return "bg-green-100 text-green-600";
};

const MyProducts = () => {
  const [products, myProducts] = useState(sampleProducts);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mt-15 text-green-600">
        My Products
      </h2>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500">{products.length} products listed</p>
        <select className="border p-2 rounded text-sm px-2">
          <option>Sort by</option>
          <option>Name</option>
          <option>Price (Low to High)</option>
          <option>Price (High to Low)</option>
          <option>Stock</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-green-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price (₹)</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Last updated</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${getStockColor(
                      product.quantity
                    )}`}
                  >
                    {getStock(product.quantity)}
                  </span>
                </td>
                <td className="p-3">{product.lastUpdated}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    <FiEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyProducts;
