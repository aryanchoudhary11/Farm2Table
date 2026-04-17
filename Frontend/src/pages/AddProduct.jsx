import { useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import API_URL from "../config";

const CATEGORIES = ["Vegetables", "Fruits", "Dairy", "Organic"];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    harvestDate: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg }
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setProduct((p) => ({ ...p, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setProduct((p) => ({ ...p, [name]: value }));
    }
  };

  const clearImage = () => {
    setProduct((p) => ({ ...p, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const { name, price, quantity, category, harvestDate, image } = product;
    if (!name || !price || !quantity || !category || !harvestDate || !image) {
      setStatus({
        type: "error",
        msg: "Please fill in all fields and upload an image.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("harvestDate", harvestDate);
      formData.append("image", image);

      const res = await fetch(`${API_URL}/api/farmer/add-product`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        /* empty */
      }

      if (!res.ok) {
        setStatus({
          type: "error",
          msg: data?.message || "Failed to add product.",
        });
        return;
      }

      setStatus({ type: "success", msg: "Product added successfully!" });
      setProduct({
        name: "",
        quantity: "",
        price: "",
        harvestDate: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
    } catch {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-8 mt-10">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-1">
          Inventory
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Add new product</h1>
        <p className="text-sm text-gray-400 mt-1">
          List a new product for customers to discover and order.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-2xl">
        {status && (
          <div
            className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 mb-5 ${
              status.type === "error"
                ? "bg-red-50 border border-red-100 text-red-600"
                : "bg-green-50 border border-green-200 text-green-700"
            }`}
          >
            {status.type === "success" && (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            )}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Product name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Fresh Tomatoes"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Product image
            </label>
            {imagePreview ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-colors">
                <Upload className="w-6 h-6 text-gray-300 mb-2" />
                <span className="text-sm text-gray-400">
                  Click to upload image
                </span>
                <span className="text-xs text-gray-300 mt-0.5">
                  PNG, JPG up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Quantity + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Quantity (units)
              </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300"
              />
            </div>
          </div>

          {/* Harvest date + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Harvest date
              </label>
              <input
                type="date"
                name="harvestDate"
                value={product.harvestDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-700 bg-white"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {submitting ? "Adding product..." : "Add product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
