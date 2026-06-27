import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    toast.success("🛒 Mahsulot savatga qo'shildi!", {
  position: "bottom-right",

  autoClose: 2500,

  hideProgressBar: false,

  closeButton: false,

  theme: "colored",

  style: {
    borderRadius: "18px",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
    boxShadow: "0 15px 40px rgba(37,99,235,.35)",
    backdropFilter: "blur(12px)",
  },
});
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );

    toast.error("Mahsulot savatdan o'chirildi");
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };
const decreaseQty = (id) => {
  const product = cart.find((item) => item.id === id);

  if (!product) return;

  if (product.quantity === 1) {
    setCart(cart.filter((item) => item.id !== id));

    toast.error("🗑️ Mahsulot savatdan o'chirildi", {
      position: "bottom-right",
      autoClose: 2000,
      closeButton: false,
      theme: "colored",
      style: {
        borderRadius: "18px",
        background: "linear-gradient(135deg,#ef4444,#dc2626)",
        color: "#fff",
        fontWeight: "700",
      },
    });

    return;
  }

  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    )
  );
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};