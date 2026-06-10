import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
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
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a,#7c3aed)",
          color: "#fff",
          padding: "40px 20px",
        }}
      >
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

        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
            zIndex: 2,
          }}
        >
          <div style={{ flex: 1 }}>
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: "70px",
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
                fontSize: "20px",
                lineHeight: "1.7",
                color: "#dbeafe",
                maxWidth: "600px",
                marginBottom: "30px",
              }}
            >
              Smartfonlar, noutbuklar, planshetlar va
              zamonaviy aksessuarlarni eng yaxshi
              narxlarda xarid qiling.
            </motion.p>

            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "16px 40px",
                  border: "none",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow:
                    "0 10px 30px rgba(37,99,235,0.4)",
                }}
              >
                Xaridni boshlash
              </motion.button>
            </Link>

            <div
              style={{
                display: "flex",
                gap: "50px",
                marginTop: "50px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ fontSize: "36px" }}>1000+</h2>
                <p>Mamnun mijozlar</p>
              </div>

              <div>
                <h2 style={{ fontSize: "36px" }}>500+</h2>
                <p>Mahsulotlar</p>
              </div>

              <div>
                <h2 style={{ fontSize: "36px" }}>24/7</h2>
                <p>Qo'llab-quvvatlash</p>
              </div>
            </div>
          </div>

          <motion.img
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
            alt="Electronics"
            style={{
              width: "500px",
              maxWidth: "100%",
              borderRadius: "30px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </section>

      <FeaturedProducts />

      <section
        style={{
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "50px",
          }}
        >
          Nega aynan biz?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              🚚
            </div>

            <h3>Tezkor yetkazib berish</h3>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Buyurtmalaringiz tez va xavfsiz
              yetkazib beriladi.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              💳
            </div>

            <h3>Xavfsiz to'lov</h3>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Zamonaviy va himoyalangan to'lov
              tizimlari.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              ⭐
            </div>

            <h3>Yuqori sifat</h3>

            <p
              style={{
                color: "#666",
                marginTop: "10px",
              }}
            >
              Faqat sifatli va ishonchli
              mahsulotlar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}