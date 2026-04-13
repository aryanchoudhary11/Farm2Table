import { useState, useEffect } from "react";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import Summary from "../../components/Cart/Summary";
import API from "../../api";
import API_URL from "../../config";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/api/products/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(data.filter((item) => item && item.product));
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put(
        `/api/products/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: data.quantity } : item,
        ),
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/products/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const subTotal = items.reduce((acc, item) => {
    if (!item?.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  const deliveryFee = subTotal > 0 && subTotal < 99 ? 20 : 0;

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-2">
            Shopping
          </span>
          <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
          {items.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
              <ShoppingCart className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Browse fresh produce from local farms and add items to get
              started.
            </p>
            <a
              href="/products"
              className="bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
                >
                  {/* Image */}
                  <img
                    src={`${API_URL}/uploads/products/${item.product.image}`}
                    alt={item.product.name}
                    className="w-18 h-18 w-[72px] h-[72px] object-cover rounded-xl flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.product.farmer}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ₹{item.product.price} per unit
                    </p>

                    {/* Quantity stepper */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-gray-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price + delete */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item._id)}
                      title="Remove item"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Free delivery nudge */}
              {deliveryFee > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 font-medium">
                  Add ₹{99 - subTotal} more to get free delivery
                </div>
              )}
            </div>

            {/* Summary */}
            <Summary subTotal={subTotal} deliveryFee={deliveryFee} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
