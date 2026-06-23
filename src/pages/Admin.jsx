import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Admin() {
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

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  const totalSales = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  // Kartalar uchun umumiy inline stil
  const cardStyle = {
    background: "#fff",
    padding: isMobile ? "20px" : "25px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid #f1f5f9",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: isMobile ? "20px 15px" : "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: isMobile ? "28px" : "42px",
          marginBottom: isMobile ? "20px" : "30px",
          fontWeight: "700",
          color: "#0f172a",
        }}
      >
        Admin Panel
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fit, minmax(200px, 1fr))"
            : "repeat(auto-fit, minmax(250px, 1fr))",
          gap: isMobile ? "15px" : "20px",
          marginBottom: isMobile ? "30px" : "40px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 5px 0", color: "#64748b", fontSize: "16px" }}>
            🛒 Buyurtmalar
          </h3>
          <h1 style={{ margin: 0, fontSize: isMobile ? "28px" : "36px", fontWeight: "700" }}>
            {orders.length}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 5px 0", color: "#64748b", fontSize: "16px" }}>
            💰 Savdo
          </h3>
          <h1 style={{ margin: 0, fontSize: isMobile ? "28px" : "36px", fontWeight: "700", color: "#16a34a" }}>
            ${totalSales.toFixed(2)}
          </h1>
        </div>
      </div>

      <h2
        style={{
          fontSize: isMobile ? "20px" : "26px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "15px",
        }}
      >
        Buyurtmalar ro'yxati ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "16px",
            textAlign: "center",
            color: "#64748b",
            border: "1px solid #e2e8f0",
          }}
        >
          Hozircha xaridlar mavjud emas.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "#fff",
                padding: isMobile ? "15px" : "20px",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                border: "1px solid #f1f5f9",
                boxSizing: "border-box",
                fontSize: isMobile ? "14px" : "15px",
              }}
            >
              <p style={{ margin: "4px 0", wordBreak: "break-all" }}>
                <b>Mijoz:</b> {order.user}
              </p>

              <p style={{ margin: "4px 0" }}>
                <b>Sana:</b> {order.date}
              </p>

              <p style={{ margin: "4px 0", color: "#2563eb", fontWeight: "600" }}>
                <b>Jami:</b> ${order.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}