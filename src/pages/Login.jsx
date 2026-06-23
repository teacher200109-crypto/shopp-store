import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }

    const user = {
      name: email.split("@")[0],
      email,
      avatar: "https://i.pravatar.cc/150?img=12",
      isLoggedIn: true,
    };

    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Tizimga muvaffaqiyatli kirildi");

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
        padding: isMobile ? "12px" : "20px", // Mobil uchun tashqi chekka bo'shliq ixchamlashtirildi
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)", // Eski iOS (Safari) brauzerlari uchun blur effekti
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "25px",
          padding: isMobile ? "25px 20px" : "40px", // Telefonda karta ichidagi padding qisqartirildi
          color: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          boxSizing: "border-box", // Element o'lchami padding hisobiga buzilmasligi uchun
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: isMobile ? "28px" : "36px", // Shrift hajmi ekranga moslashdi
            fontWeight: "700",
          }}
        >
          Xush kelibsiz 👋
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "20px" : "30px",
            color: "#cbd5e1",
            fontSize: isMobile ? "14px" : "15px",
          }}
        >
          Davom etish uchun tizimga kiring
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px", // Mobil qurilmalarda avtomatik yaqinlashish (auto-zoom) oldini olish uchun 16px tavsiya etiladi
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />

          <input
            type="password"
            placeholder="Parol kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "600",
              boxSizing: "border-box",
            }}
          >
            Kirish
          </motion.button>
        </form>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: isMobile ? "13px" : "14px",
            lineHeight: "1.4",
          }}
        >
          Demo login uchun istalgan email va parol kiriting
        </p>
      </motion.div>
    </div>
  );
}