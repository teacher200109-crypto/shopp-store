import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();

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

  const user = JSON.parse(localStorage.getItem("user"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const totalSpent = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (!user) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: isMobile ? "24px" : "32px", textAlign: "center" }}>
          Foydalanuvchi topilmadi
        </h1>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "90vh",
        padding: isMobile ? "20px 10px" : "40px 20px",
        background: "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* Banner qismi */}
        <div
          style={{
            height: isMobile ? "150px" : "220px", // Telefonda banner balandligi qisqartirildi
            background: "linear-gradient(135deg,#2563eb,#7c3aed)",
          }}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? "-50px" : "-70px", // Rasm o'lchamiga qarab salbiy margin moslashtirildi
            padding: isMobile ? "0 15px 30px" : "0 30px 40px",
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: isMobile ? "100px" : "140px", // Avatar o'lchami kichraytirildi
              height: isMobile ? "100px" : "140px",
              borderRadius: "50%",
              border: isMobile ? "4px solid white" : "6px solid white",
              objectFit: "cover",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
          />

          <h1
            style={{
              marginTop: "15px",
              fontSize: isMobile ? "26px" : "34px",
              fontWeight: "700",
            }}
          >
            {user.name}
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "5px",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            {user.email}
          </p>

          {/* Statistikalar */}
          <div
            style={{
              display: "grid",
              // Mobil qurilmalarda judayam torayib ketmasligi uchun minmax sig'imi 140px ga tushirildi
              gridTemplateColumns: isMobile 
                ? "repeat(auto-fit, minmax(140px, 1fr))" 
                : "repeat(auto-fit, minmax(180px, 1fr))",
              gap: isMobile ? "12px" : "20px",
              marginTop: "35px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                padding: isMobile ? "15px" : "25px",
                borderRadius: "18px",
                border: "1px solid #f1f5f9",
              }}
            >
              <h3 style={{ fontSize: isMobile ? "14px" : "16px", margin: "0 0 5px 0" }}>🛒 Buyurtmalar</h3>
              <h2 style={{ fontSize: isMobile ? "22px" : "28px", margin: 0 }}>{orders.length}</h2>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: isMobile ? "15px" : "25px",
                borderRadius: "18px",
                border: "1px solid #f1f5f9",
              }}
            >
              <h3 style={{ fontSize: isMobile ? "14px" : "16px", margin: "0 0 5px 0" }}>💰 Xaridlar</h3>
              <h2 style={{ fontSize: isMobile ? "22px" : "28px", margin: 0 }}>
                ${totalSpent.toFixed(2)}
              </h2>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: isMobile ? "15px" : "25px",
                borderRadius: "18px",
                border: "1px solid #f1f5f9",
                gridColumn: isMobile ? "span 2" : "auto", // Telefonlarda muvozanat uchun "Status" blokini eniga cho'zish mumkin (ixtiyoriy)
              }}
            >
              <h3 style={{ fontSize: isMobile ? "14px" : "16px", margin: "0 0 5px 0" }}>⭐ Status</h3>
              <h2 style={{ fontSize: isMobile ? "22px" : "28px", color: "#7c3aed", margin: 0 }}>Premium</h2>
            </div>
          </div>

          {/* Buyurtmalar tarixi */}
          <div
            style={{
              marginTop: "45px",
              textAlign: "left",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: "700",
              }}
            >
              Buyurtmalar tarixi
            </h2>

            {orders.length === 0 ? (
              <div
                style={{
                  background: "#f8fafc",
                  padding: "20px",
                  borderRadius: "15px",
                  color: "#64748b",
                  fontSize: "15px",
                }}
              >
                Hozircha buyurtmalar mavjud emas.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: "#f8fafc",
                    padding: isMobile ? "15px" : "20px",
                    borderRadius: "15px",
                    marginBottom: "15px",
                    border: "1px solid #f1f5f9",
                    fontSize: isMobile ? "14px" : "15px",
                  }}
                >
                  <p style={{ margin: "5px 0" }}>
                    <b>Buyurtma ID:</b> {order.id}
                  </p>

                  <p style={{ margin: "5px 0" }}>
                    <b>Sana:</b> {order.date}
                  </p>

                  <p style={{ margin: "5px 0" }}>
                    <b>Jami:</b> ${order.total.toFixed(2)}
                  </p>

                  <p style={{ margin: "10px 0 5px 0" }}>
                    <b>Mahsulotlar:</b>
                  </p>

                  <ul
                    style={{
                      marginTop: "5px",
                      paddingLeft: "20px",
                      color: "#334155",
                    }}
                  >
                    {order.products?.map((product) => (
                      <li key={product.id} style={{ marginBottom: "3px" }}>
                        {product.title} × {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: isMobile ? "100%" : "auto", // Telefonda tugmani to'liq enli qilish qulayroq bosiladi
              marginTop: "30px",
              padding: "14px 40px",
              border: "none",
              borderRadius: "12px",
              background: "#ef4444",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
            }}
          >
            Chiqish
          </button>
        </div>
      </motion.div>
    </div>
  );
}