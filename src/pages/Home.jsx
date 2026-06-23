import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  // Ekran o'lchamini kuzatish uchun state
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive o'zgaruvchilar (Breakpoints)
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <>
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg,#0f172a,#1e3a8a,#7c3aed)",
          color: "#fff",
          padding: isMobile ? "60px 20px" : "40px 20px",
        }}
      >
        {/* Orqa fondagi blur doiralar (Faqat planshet va kompyuterda ko'rinadi) */}
        {!isMobile && (
          <>
            <div
              style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                background: "#2563eb",
                borderRadius: "50%",
                filter: "blur(120px)",
                top: "-150px",
                left: "-150px",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                background: "#9333ea",
                borderRadius: "50%",
                filter: "blur(120px)",
                bottom: "-150px",
                right: "-150px",
                opacity: 0.5,
              }}
            />
          </>
        )}

        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Mobil telefonda elementlar ustma-ust tushadi
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? "40px" : "60px",
            zIndex: 2,
          }}
        >
          <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
            <motion.h1
              initial={{ opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? -20 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: isMobile ? "40px" : isTablet ? "52px" : "70px", // Ekran o'lchamiga qarab shrift o'zgaradi
                lineHeight: "1.1",
                marginBottom: "20px",
              }}
            >
              Kelajak
              <br />
              texnologiyasi
              <br />
              siz bilan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: isMobile ? "16px" : "20px",
                lineHeight: "1.7",
                color: "#dbeafe",
                maxWidth: "600px",
                margin: isMobile ? "0 auto 30px" : "0 0 30px",
              }}
            >
              Smartfonlar, noutbuklar, planshetlar va zamonaviy aksessuarlarni eng
              yaxshi narxlarda xarid qiling.
            </motion.p>

            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? "14px 32px" : "16px 40px",
                  border: "none",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                  color: "#fff",
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(37,99,235,0.4)",
                }}
              >
                Xaridni boshlash
              </motion.button>
            </Link>

            <div
              style={{
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: isMobile ? "30px" : "50px",
                marginTop: "50px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ fontSize: isMobile ? "28px" : "36px" }}>1000+</h2>
                <p style={{ fontSize: isMobile ? "14px" : "16px" }}>Mamnun mijozlar</p>
              </div>

              <div>
                <h2 style={{ fontSize: isMobile ? "28px" : "36px" }}>500+</h2>
                <p style={{ fontSize: isMobile ? "14px" : "16px" }}>Mahsulotlar</p>
              </div>

              <div>
                <h2 style={{ fontSize: isMobile ? "28px" : "36px" }}>24/7</h2>
                <p style={{ fontSize: isMobile ? "14px" : "16px" }}>Qo'llab-quvvatlash</p>
              </div>
            </div>
          </div>

          <motion.img
            initial={{ opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1 }}
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
            alt="Electronics"
            style={{
              width: isMobile ? "100%" : isTablet ? "400px" : "500px",
              maxWidth: "100%",
              borderRadius: "30px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </section>

      <FeaturedProducts />

      <section
        style={{
          maxWidth: "1200px",
          margin: isMobile ? "50px auto" : "80px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: isMobile ? "30px" : "40px",
            marginBottom: isMobile ? "30px" : "50px",
          }}
        >
          Nega aynan biz?
        </h2>

        {/* CSS Grid yordamida kartalar avtomatik responsive bo'ladi */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>🚚</div>
            <h3>Tezkor yetkazib berish</h3>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Buyurtmalaringiz tez va xavfsiz yetkazib beriladi.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>💳</div>
            <h3>Xavfsiz to'lov</h3>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Zamonaviy va himoyalangan to'lov tizimlari.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>⭐</div>
            <h3>Yuqori sifat</h3>
            <p style={{ color: "#666", marginTop: "10px" }}>
              Faqat sifatli va ishonchli mahsulotlar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}