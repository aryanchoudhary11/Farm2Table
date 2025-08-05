import { useState } from "react";

const AddProduct = () => {
  const [message, setMessage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    harvestDate: "",
    category: "",
    image: null,
  });
  const categories = ["Vegetables", "Fruits", "Dairy", "Organic"];
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.quantity ||
      !product.price ||
      !product.harvestDate ||
      !product.category ||
      !product.image
    ) {
      setMessage("❌ Please fill all fields");
      return;
    }
    setMessage("✅ Product added successfully!");
    setProduct({
      name: "",
      quantity: "",
      price: "",
      harvestDate: "",
      category: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded shadow mt-15">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Add New Product
      </h2>
      {message && (
        <p className="mb-4 font-semibold text-center sm:text-left">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 w-full object-cover rounded"
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium">Quantity in Stock</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price per Unit</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Harvest Date</label>
          <input
            type="date"
            name="harvestDate"
            value={product.harvestDate}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
