import { useState, useEffect } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import API from "../api";
import API_URL from "../config";
import toast, { Toaster } from "react-hot-toast";

const stockLabel = (qty) => {
  if (qty === 0)
    return {
      text: "Out of stock",
      classes: "bg-red-50 text-red-600 border-red-100",
    };
  if (qty < 5)
    return {
      text: "Low stock",
      classes: "bg-amber-50 text-amber-600 border-amber-100",
    };
  return {
    text: "In stock",
    classes: "bg-green-50 text-green-700 border-green-100",
  };
};

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "Name", label: "Name (A–Z)" },
  { value: "Price (Low to High)", label: "Price: low to high" },
  { value: "Price (High to Low)", label: "Price: high to low" },
  { value: "Stock", label: "Stock" },
];

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

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
    } catch {
      setProducts([]);
    }
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    if (!option) {
      fetchProducts();
      return;
    }
    setProducts((prev) => {
      const sorted = [...prev];
      if (option === "Name")
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      else if (option === "Price (Low to High)")
        sorted.sort((a, b) => a.price - b.price);
      else if (option === "Price (High to Low)")
        sorted.sort((a, b) => b.price - a.price);
      else if (option === "Stock")
        sorted.sort((a, b) => b.quantity - a.quantity);
      return sorted;
    });
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
    });
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("quantity", formData.quantity);
      fd.append("price", formData.price);
      if (formData.image instanceof File) fd.append("image", formData.image);

      await API.put(`/api/farmer/my-products/${editProduct.id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setEditProduct(null);
      fetchProducts();
      toast.success("Product updated.");
    } catch {
      toast.error("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/farmer/my-products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setDeleteConfirmId(null);
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <section className="py-8 mt-10">
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "13px" } }}
      />

      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-1">
          Inventory
        </p>
        <h1 className="text-2xl font-bold text-gray-900">My products</h1>
        <p className="text-sm text-gray-400 mt-1">
          {products.length} products listed
        </p>
      </div>

      {/* Sort bar */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold tracking-wide uppercase text-gray-400">
                <th className="px-5 py-3.5 text-left">Product</th>
                <th className="px-5 py-3.5 text-left">Category</th>
                <th className="px-5 py-3.5 text-right">Price</th>
                <th className="px-5 py-3.5 text-right">Qty</th>
                <th className="px-5 py-3.5 text-left">Stock</th>
                <th className="px-5 py-3.5 text-left">Updated</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No products listed yet.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const stock = stockLabel(product.quantity);
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={`${API_URL}/uploads/products/${product.image}`}
                            alt={product.name}
                            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                          />
                          <span className="font-medium text-gray-800">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {product.category || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold text-gray-800">
                        ₹{product.price}
                      </td>
                      <td className="px-5 py-3.5 text-right text-gray-600">
                        {product.quantity}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-block text-xs font-semibold border px-2.5 py-0.5 rounded-full ${stock.classes}`}
                        >
                          {stock.text}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-400 text-xs">
                        {product.lastUpdated
                          ? new Date(product.lastUpdated).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "short" },
                            )
                          : "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => openEdit(product)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setEditProduct(null)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">
                Edit product
              </h3>
              <button
                onClick={() => setEditProduct(null)}
                className="text-gray-300 hover:text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "name", label: "Product name", type: "text" },
                { name: "quantity", label: "Quantity", type: "number" },
                { name: "price", label: "Price (₹)", type: "number" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, [name]: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  New image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, image: e.target.files[0] }))
                  }
                  className="text-sm text-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditProduct(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Delete product?
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              This will permanently remove the product from your listings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50"
              >
                Keep it
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProducts;
