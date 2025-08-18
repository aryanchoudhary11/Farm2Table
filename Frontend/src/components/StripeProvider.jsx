// src/stripe/StripeProvider.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RuyNyKB2T9tzzlIrbrJ9UnMVGfgooCCUaZ8HWkM7a8EKYkBZfvFJmnz54rfzTSutrJ1s5CpKymAUi8lXQtamVlF00xaJDwVCn"
);

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
