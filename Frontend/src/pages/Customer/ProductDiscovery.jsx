import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
  SlidersHorizontal,
} from "lucide-react";
import API from "../../api";
import API_URL from "../../config";

const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy"];

const ProductDiscovery = () => {
  const [userLocation, setUserLocation] = useState("Detecting location...");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [addingId, setAddingId] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(
          `${position.coords.latitude.toFixed(4)}°N, ${position.coords.longitude.toFixed(4)}°E`,
        );
      },
      () => {
        setUserLocation("Location unavailable");
      },
    );
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;
      const { data } = await API.get("/api/products", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const getQty = (id) => quantities[id] ?? 1;

  const adjustQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please log in to add items to your cart.");
      return;
    }
    setAddingId(productId);
    try {
      await API.post(
        "/api/products/cart",
        { productId, quantity: getQty(productId) },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showToast("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      showToast("Failed to add to cart.");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-2">
            Marketplace
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Fresh near you</h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-3 py-2 w-fit">
              <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
              <span className="truncate max-w-[200px]">{userLocation}</span>
            </div>
          </div>
        </div>

        {/* Search + filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Search for vegetables, fruits, dairy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0 sm:hidden" />
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value === "All" ? "" : e.target.value,
                )
              }
              className="w-full sm:w-40 text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-600 bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills (desktop quick filter) */}
        <div className="hidden sm:flex gap-2 mb-6 flex-wrap">
          {CATEGORIES.map((cat) => {
            const active =
              (cat === "All" && !selectedCategory) || cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                  active
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-gray-500 border-gray-200 hover:border-green-400 hover:text-green-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Finding fresh produce...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">
              No products found
            </h2>
            <p className="text-sm text-gray-400">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-4">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => {
                const inStock = product.quantity > 0;
                const qty = getQty(product._id);
                const isAdding = addingId === product._id;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col group"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={`${API_URL}/uploads/products/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!inStock && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-xs font-semibold text-red-500 bg-white border border-red-200 px-3 py-1 rounded-full">
                            Out of stock
                          </span>
                        </div>
                      )}
                      {inStock && (
                        <span className="absolute top-3 right-3 text-xs font-semibold bg-green-600 text-white px-2.5 py-1 rounded-full">
                          In stock
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="text-sm font-semibold text-gray-900 mb-0.5">
                        {product.name}
                      </h2>
                      <p className="text-xs text-gray-400 mb-3">
                        by {product.farmer}
                      </p>

                      <div className="mt-auto">
                        <p className="text-lg font-bold text-gray-900 mb-3">
                          ₹{product.price}
                          <span className="text-xs font-normal text-gray-400 ml-1">
                            / unit
                          </span>
                        </p>

                        {/* Quantity stepper + add to cart */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => adjustQty(product._id, -1)}
                              disabled={qty <= 1 || !inStock}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold text-gray-800">
                              {qty}
                            </span>
                            <button
                              onClick={() => adjustQty(product._id, 1)}
                              disabled={!inStock}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product._id)}
                            disabled={!inStock || isAdding}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
                          >
                            {isAdding ? (
                              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <ShoppingCart className="w-3.5 h-3.5" />
                            )}
                            {isAdding ? "Adding..." : "Add to cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg z-50 animate-fade-in">
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default ProductDiscovery;
