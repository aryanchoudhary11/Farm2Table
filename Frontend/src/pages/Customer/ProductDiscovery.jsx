import { useEffect, useState } from "react";
import API from "../../api";
import API_URL from "../../config";

const ProductDiscovery = () => {
  const [userLocation, setUserLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(
          `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`
        );
      },
      () => {
        setUserLocation("Unbale to detect, Please enter pincode manually");
      }
    );
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      const { data } = await API.get("/api/products", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first to add items to your cart.");
        return;
      }
      const data = await API.post(
        "/api/products/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("❌ Failed to add to cart.");
    }
  };
  return (
    <div className="p-4 md:p-8 mt-15">
      <h1 className="text-2xl font-semibold mb-4 text-green-700">
        Find Fresh Products Near You
      </h1>
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <span className="text-gray-700">
          📍 <strong>Your Location:</strong> {userLocation}
        </span>
        <button className="text-sm text-green-600 hover:underline cursor-pointer">
          Change Pincode
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product._id}
            className=" bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`${API_URL}/uploads/products/${product.image}`}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">by {product.farmer}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-green-600 font-bold">
                  ₹{product.price}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    product.quantity > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  defaultValue={1}
                  className="w-16 p-1 border rounded"
                  id={`qty-${product._id}`}
                />
                <button
                  onClick={() => {
                    const qty = parseInt(
                      document.getElementById(`qty-${product._id}`).value
                    );
                    handleAddToCart(product._id, qty);
                  }}
                  disabled={product.quantity === 0}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductDiscovery;
