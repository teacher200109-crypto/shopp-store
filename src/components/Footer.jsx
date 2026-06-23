import { useEffect, useState } from "react";

export default function Footer() {
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
    <footer
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#fff",
        marginTop: isMobile ? "40px" : "80px", // Telefonda yuqorigi bo'shliq qisqartirildi
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: isMobile ? "40px 15px" : "50px 20px", // Chetki padding moslashtirildi
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: isMobile ? "35px" : "30px", // Elementlar ustma-ust tushganda bloklar aro masofa oshirildi
          textAlign: isMobile ? "center" : "left", // Telefonda hamma matnlar markazga tekislanadi
        }}
      >
        <div>
          <h2
            style={{
              marginBottom: "15px",
              fontSize: isMobile ? "22px" : "26px",
              letterSpacing: "1px",
            }}
          >
            SHOPP STORE
          </h2>
          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
              fontSize: "15px",
              maxWidth: isMobile ? "100%" : "280px", // Kompyuterda matn eni cheqlandi, telefonda to'liq
            }}
          >
            Smartfonlar, noutbuklar, planshetlar va aksessuarlarni eng yaxshi
            narxlarda xarid qiling.
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Bo'limlar</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#cbd5e1" }}>
            <p style={{ margin: 0, cursor: "pointer" }}>🏠 Bosh sahifa</p>
            <p style={{ margin: 0, cursor: "pointer" }}>📱 Mahsulotlar</p>
            <p style={{ margin: 0, cursor: "pointer" }}>🛒 Savatcha</p>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Aloqa</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#cbd5e1" }}>
            <p style={{ margin: 0 }}>📍 Qashqadaryo, O'zbekiston</p>
            <p style={{ margin: 0 }}>📞 +998 90 123 45 67</p>
            <p style={{ margin: 0 }}>✉️ info@shoppstore.uz</p>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Ijtimoiy tarmoqlar</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#cbd5e1" }}>
            <p style={{ margin: 0, cursor: "pointer" }}>📘 Facebook</p>
            <p style={{ margin: 0, cursor: "pointer" }}>📸 Instagram</p>
            <p style={{ margin: 0, cursor: "pointer" }}>📢 Telegram</p>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          padding: "20px",
          color: "#94a3b8",
          fontSize: isMobile ? "13px" : "14px", // Mualliflik huquqi matni telefonda kichraytirildi
        }}
      >
        © 2026 SHOPP STORE | Barcha huquqlar himoyalangan
      </div>
    </footer>
  );
}