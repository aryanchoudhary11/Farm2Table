const Summary = ({ subTotal, deliveryFee }) => {
  const total = subTotal + deliveryFee;
  return (
    <div>
      <h2>Order Summary</h2>
      <div>
        <span>Subtotal</span>
        <span>₹{subTotal}</span>
      </div>
      <div>
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>
      <hr />
      <div>
        <span>Total</span>
        <span>₹{total}</span>
      </div>
      <button>Proceed to CheckOut</button>
    </div>
  );
};
export default Summary;
