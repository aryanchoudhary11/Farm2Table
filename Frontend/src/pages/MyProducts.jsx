import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import API from "../api";
import API_URL from "../config";
import toast, { Toaster } from "react-hot-toast";

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
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/api/farmer/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedProducts = [...products];

    switch (option) {
      case "Name":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Price (Low to High)":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price (High to Low)":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Stock":
        sortedProducts.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        fetchProducts();
        return;
    }

    setProducts(sortedProducts);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("price", formData.price);

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      await API.put(
        "/api/farmer/my-products/${editProduct.id}",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditProduct(null);
      fetchProducts();
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/farmer/my-products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />

      <h2 className="text-xl font-bold mb-4 mt-15 text-green-600">
        My Products
      </h2>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500">{products.length} products listed</p>
        <select
          className="border p-2 rounded text-sm px-2"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort by</option>
          <option value="Name">Name</option>
          <option value="Price (Low to High)">Price (Low to High)</option>
          <option value="Price (High to Low)">Price (High to Low)</option>
          <option value="Stock">Stock</option>
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
                    src={`${API_URL}/uploads/products/${product.image}`}
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
                  <button
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleEditClick(product)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4 text-green-600">
              Edit Product
            </h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 mb-2 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
