import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/success"
          element={<Success />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <Footer />
    </>
  );
}

export default App;