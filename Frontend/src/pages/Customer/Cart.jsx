import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Summary from "../../components/Cart/Summary";
import axios from "axios";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async (req, res) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5000/api/products/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };
  const updateQuantity = async (id, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/products/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: data.quantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/products/cart/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems((prev) => prev.filter((item) => item._id != id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };
  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subTotal > 0 && subTotal < 99 ? 20 : 0;

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className="p-4 md:p-8 mt-15 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4 border border-green-800"
                key={item._id}
              >
                <img
                  src={`http://localhost:5000/uploads/products/${item.product.image}`}
                  alt={item.product.name}
                  className="w-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-green-800">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {" "}
                    👨‍🌾{item.product.farmer}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity ?? 1}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 p-1 border rounded-lg text-center"
                    />
                    <span className="font-bold text-green-700">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  title="Remove Item"
                  className="text-red-500 hover:text-700 text-lg"
                >
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                </button>
              </div>
            ))
          ) : (
            <p>Your Cart is empty</p>
          )}
        </div>
        <Summary subTotal={subTotal} deliveryFee={deliveryFee} />
      </div>
    </div>
  );
};
export default Cart;
