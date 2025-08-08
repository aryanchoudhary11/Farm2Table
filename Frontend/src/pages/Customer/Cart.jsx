import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Summary from "../../components/Cart/Summary";

const cartItems = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    farmer: "Green Valley Farm",
    price: 30,
    quantity: 2,
    image:
      "https://theworldonaplatter.com/wp-content/uploads/2020/08/tomato-basket-912.jpg",
  },
  {
    id: 2,
    name: "Organic Bananas",
    farmer: "Tropical Roots",
    price: 50,
    quantity: 1,
    image:
      "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg",
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subTotal > 0 && subTotal < 99 ? 20 : 0;
  return (
    <div className="p-4 md:p-8 mt-15 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4 border border-green-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-green-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500"> 👨‍🌾{item.farmer}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 p-1 border rounded-lg text-center"
                    />
                    <span className="font-bold text-green-700">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
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
