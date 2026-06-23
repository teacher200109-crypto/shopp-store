import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Success() {
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

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 20px", // Mobil ekranlarda matn chekkalarga taqalib qolmasligi uchun
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: isMobile ? "45px" : "60px", // Emoji o'lchami telefonda biroz kichraytirildi
          marginBottom: "15px",
        }}
      >
        ✅
      </h1>

      <h2
        style={{
          fontSize: isMobile ? "22px" : "28px", // Sarlavha shrift o'lchami responsive qilindi
          fontWeight: "700",
          margin: "0",
          color: "#0f172a",
        }}
      >
        Buyurtma muvaffaqiyatli berildi!
      </h2>

      <p
        style={{
          marginTop: "12px",
          color: "#64748b",
          fontSize: isMobile ? "15px" : "16px",
        }}
      >
        Xaridingiz uchun rahmat!
      </p>

      {/* Link eni mobil ekranda tugmani to'liq qoplashi uchun styles qo'shildi */}
      <Link to="/products" style={{ textDecoration: "none", width: isMobile ? "100%" : "auto", maxWidth: "320px" }}>
        <button
          style={{
            marginTop: "30px",
            padding: "14px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            width: "100%", // Ota-konteyner (Link) o'lchamiga moslashadi
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
            transition: "background 0.2s",
          }}
        >
          Xaridni davom ettirish
        </button>
      </Link>
    </div>
  );
}