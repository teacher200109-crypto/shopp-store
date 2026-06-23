import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  // Ekran o'lchamini kuzatish uchun state
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1 style={{ fontSize: isMobile ? "32px" : "42px" }}>
          Savatcha bo'sh 🛒
        </h1>

        <p style={{ color: "#666", fontSize: isMobile ? "16px" : "18px" }}>
          Hozircha hech qanday mahsulot yo'q
        </p>

        <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 30px",
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Xarid qilishni boshlash
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: isMobile ? "20px 12px" : "30px 20px",
        minHeight: "80vh",
      }}
    >
      <h1
        style={{
          fontSize: isMobile ? "32px" : "42px",
          marginBottom: "25px",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        Savatcha
      </h1>

      <div
        style={{
          display: "grid",
          // Mobil telefonda ustma-ust (1fr), kompyuterda yonma-yon (2fr 1fr)
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
          gap: "30px",
        }}
      >
        <div>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={isMobile ? {} : { y: -3 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                // Telefon ekranida elementlar ichma-ich ustma-ust tushadi
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: "20px",
                background: "linear-gradient(145deg,#ffffff,#f8fafc)",
                padding: "20px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <motion.img
                  whileHover={isMobile ? {} : { scale: 1.08, rotate: 2 }}
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: isMobile ? "90px" : "120px",
                    height: isMobile ? "90px" : "120px",
                    objectFit: "cover",
                    borderRadius: "14px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "5px", fontSize: isMobile ? "16px" : "18px" }}>
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "#2563eb",
                      fontWeight: "700",
                      fontSize: isMobile ? "18px" : "22px",
                    }}
                  >
                    ${item.price}
                  </p>
                </div>
              </div>

              {/* Soni va O'chirish tugmalari qismi */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: isMobile ? "10px" : "0",
                  width: isMobile ? "100%" : "auto",
                  gap: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => decreaseQty(item.id)}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#e5e7eb",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    −
                  </button>

                  <span style={{ fontSize: "16px", fontWeight: "700" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563eb",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: isMobile ? "14px" : "15px",
                  }}
                >
                  O'chirish
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Buyurtma hisob-kitob bloki */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "linear-gradient(145deg,#ffffff,#eff6ff)",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            height: "fit-content",
            position: isMobile ? "static" : "sticky", // Mobil ekranda yopishib turish (sticky) shart emas
            top: "100px",
          }}
        >
          <h2 style={{ marginBottom: "25px", fontSize: isMobile ? "20px" : "24px" }}>
            Buyurtma ma'lumotlari
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <span>Mahsulotlar</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <span>Yetkazib berish</span>
            <span style={{ color: "#16a34a", fontWeight: "600" }}>Bepul</span>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
            }}
          >
            <span>Jami</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCheckout}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Buyurtmani rasmiylashtirish
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}