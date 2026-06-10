import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        }}
      >
        <h1 style={{ fontSize: "42px" }}>
          Savatcha bo'sh 🛒
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
          }}
        >
          Hozircha hech qanday mahsulot yo'q
        </p>

        <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 30px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
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
        padding: "30px 20px",
        minHeight: "80vh",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        Savatcha
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
        }}
      >
        {/* PRODUCTS */}
        <div>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                gap: "20px",
                background:
                  "linear-gradient(145deg,#ffffff,#f8fafc)",
                padding: "20px",
                borderRadius: "20px",
                marginBottom: "20px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <motion.img
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                    fontSize: "22px",
                  }}
                >
                  ${item.price}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#e5e7eb",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563eb",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  removeFromCart(item.id)
                }
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  cursor: "pointer",
                  height: "fit-content",
                  fontWeight: "600",
                }}
              >
                O'chirish
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* SUMMARY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background:
              "linear-gradient(145deg,#ffffff,#eff6ff)",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
            height: "fit-content",
            position: "sticky",
            top: "100px",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
            }}
          >
            Buyurtma ma'lumotlari
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span>Mahsulotlar</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span>Yetkazib berish</span>
            <span
              style={{
                color: "#16a34a",
                fontWeight: "600",
              }}
            >
              Bepul
            </span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop:
                "1px solid rgba(0,0,0,0.1)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            <span>Jami</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",
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
          </Link>
        </motion.div>
      </div>
    </div>
  );
}