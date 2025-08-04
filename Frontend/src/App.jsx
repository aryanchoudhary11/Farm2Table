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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
