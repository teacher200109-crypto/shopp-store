import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Ekran o'lchamini kuzatish uchun state
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 992; // 992px dan kichik ekranlarda ustma-ust tushadi

  const user = JSON.parse(localStorage.getItem("user"));

  const BOT_TOKEN = "8853805854:AAFlFX_Nk6Azco6sJXD17KaH-ien2g_6xf0";
  const CHAT_ID = "5069418434";

  useEffect(() => {
    if (!user) {
      alert("Avval tizimga kiring!");
      navigate("/login");
    }
  }, [user, navigate]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      id: Date.now(),
      user: user.email,
      products: cart,
      total,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    const message = `
🛒 YANGI BUYURTMA

👤 Mijoz: ${user.email}

💰 Jami summa: $${total.toFixed(2)}

📦 Mahsulotlar:

${cart.map((item) => `• ${item.title} x ${item.quantity}`).join("\n")}
`;

    try {
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      alert("✅ Buyurtmangiz muvaffaqiyatli qabul qilindi!");
      navigate("/success");
    } catch (error) {
      console.log(error);
      alert("❌ Telegramga yuborishda xatolik yuz berdi!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: isMobile ? "20px 10px" : "40px 20px",
        background: "linear-gradient(135deg,#f1f5f9,#e0e7ff)",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: isMobile ? "28px" : "42px", // Mobil ekranda sarlavha kichraytirildi
            marginBottom: isMobile ? "20px" : "30px",
            textAlign: isMobile ? "center" : "left",
            fontWeight: "700",
          }}
        >
          Buyurtma berish
        </motion.h1>

        <div
          style={{
            display: "grid",
            // Mobil ekranda 1 ustun, kompyuterda 2 ustun (2fr 1fr)
            gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
            gap: isMobile ? "20px" : "30px",
          }}
        >
          {/* Forma bloki */}
          <motion.form
            initial={{ opacity: 0, x: isMobile ? 0 : -30 }} // Mobilda yondan chiqish animatsiyasi o'chirildi
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: isMobile ? "20px" : "30px", // Ichki chekka bo'shliq moslashtirildi
              borderRadius: "25px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              boxSizing: "border-box",
              order: isMobile ? 2 : 1, // Mobilda buyurtma xulosasi birinchi, forma esa pastda turadi
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: isMobile ? "20px" : "24px",
              }}
            >
              Yetkazib berish ma'lumotlari
            </h2>

            <input
              type="text"
              placeholder="To'liq ism"
              required
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email manzil"
              defaultValue={user?.email}
              required
              style={inputStyle}
            />

            <input
              type="tel"
              placeholder="+998 xx xxx xx xx"
              required
              style={inputStyle}
            />

            <textarea
              rows="4"
              placeholder="Yetkazib berish manzili"
              required
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "20px",
                border: "none",
                borderRadius: "14px",
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                color: "#fff",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              Buyurtmani tasdiqlash
            </button>
          </motion.form>

          {/* Xulosa bloki */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: "#fff",
              padding: isMobile ? "20px" : "25px",
              borderRadius: "25px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              height: "fit-content",
              position: isMobile ? "static" : "sticky", // Mobilda sticky xususiyati bekor qilindi
              top: "100px",
              boxSizing: "border-box",
              order: isMobile ? 1 : 2, // Mobilda xulosa yuqorida chiqadi (Mijoz avval nima olyotganini ko'radi)
            }}
          >
            <h2 style={{ fontSize: isMobile ? "20px" : "24px", margin: 0 }}>
              Buyurtma xulosasi
            </h2>

            <div
              style={{
                marginTop: "20px",
                maxHeight: "200px", // Agar savatchada mahsulot ko'p bo'lsa, xulosa bloki o'sib ketmasligi uchun
                overflowY: "auto",
                paddingRight: "5px",
              }}
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                    fontSize: isMobile ? "14px" : "15px",
                  }}
                >
                  <span style={{ maxWidth: "70%", wordBreak: "break-word" }}>
                    {item.title} x {item.quantity}
                  </span>

                  <span style={{ fontWeight: "600" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr style={{ margin: "15px 0", border: "0", borderTop: "1px solid #f1f5f9" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: isMobile ? "14px" : "15px",
              }}
            >
              <span>Yetkazib berish</span>
              <span style={{ color: "#16a34a", fontWeight: "600" }}>Bepul</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "700",
                marginTop: "15px",
                color: "#0f172a",
              }}
            >
              <span>Jami</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};