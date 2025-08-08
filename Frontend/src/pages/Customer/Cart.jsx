import { useState } from "react";
import Summary from "../../components/Cart/Summary";

const cartItems = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    farmer: "Green Valley Farm",
    price: 30,
    quantity: 2,
    image: "https://source.unsplash.com/400x300/?tomato",
  },
  {
    id: 2,
    name: "Organic Bananas",
    farmer: "Tropical Roots",
    price: 50,
    quantity: 1,
    image: "https://source.unsplash.com/400x300/?banana",
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
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subTotal > 0 && subTotal < 99 ? 20 : 0;
  return (
    <div>
      <h1 className="mt-15">Your Cart</h1>
      <div>
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <div>
                <div>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h2>{item.name}</h2>
                    <p> 👨‍🌾{item.farmer}</p>
                    <div>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)}>🗑</button>
                </div>
              </div>
            ))
          ) : (
            <p>Your Cart is empty</p>
          )}
        </div>
        {/*Summary*/}
        <Summary subTotal={subTotal} deliveryFee={deliveryFee} />
      </div>
    </div>
  );
};
export default Cart;
