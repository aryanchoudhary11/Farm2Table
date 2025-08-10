import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Home/Nabvar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Home/Footer";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerOnboarding from "./pages/FarmerOnboarding";
import NotFound from "./pages/NotFound";
import FarmerLayout from "./Layout/FarmerLayout";
import FarmerDashboardHome from "./pages/FarmerDashboardHome";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import TrackOrders from "./pages/TrackOrders";
import ProductDiscovery from "./pages/Customer/ProductDiscovery";
import CustomerLayout from "./Layout/CustomerLayout";
import Cart from "./pages/Customer/Cart";
import Checkout from "./pages/Customer/Checkout";
import MyOrders from "./pages/Customer/myOrders";
import MyOrderTrack from "./pages/Customer/MyOrderTrack";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/farmer-onboarding" element={<FarmerOnboarding />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/farmer" element={<FarmerLayout />}>
          <Route index element={<FarmerDashboardHome />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="orders" element={<TrackOrders />} />
        </Route>
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<ProductDiscovery />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="track-order" element={<MyOrderTrack />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
