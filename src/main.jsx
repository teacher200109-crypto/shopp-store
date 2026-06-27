import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <App />

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          transition={Slide}
          theme="colored"
        />
      </CartProvider>
    </WishlistProvider>
  </BrowserRouter>
);