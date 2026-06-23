import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ekran o'lchamini kuzatish uchun state
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleBuyNow = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product);
    navigate("/checkout");
  };

  // Breakpointlarni aniqlash
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: isMobile ? "20px" : "28px", // Yuklanish matni o'lchami responsive bo'ldi
          fontWeight: "600",
        }}
      >
        Mahsulot yuklanmoqda...
      </div>
    );
  }

  // Agar product o'sha vaqtda mavjud bo'lmasa xatolik bermasligi uchun tekshirish
  if (!product) return null;

  const oldPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: isMobile ? "20px 15px" : "40px 20px", // Chetki bo'shliqlar moslashuvchan bo'ldi
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "grid",
          // Mobil qurilmada bitta ustun (1fr), kattaroq ekranda esa ikkita ustun (1fr 1fr)
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "25px" : "50px",
          alignItems: "center",
          background: "#fff",
          padding: isMobile ? "20px" : "40px", // Ichki padding qisqartirildi
          borderRadius: "30px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        <motion.div whileHover={isMobile ? {} : { scale: 1.03 }}> {/* Telefonda rasmning scale bo'lishi o'chirildi */}
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: isMobile ? "350px" : "550px", // Rasm balandligi telefonda kichraytirildi
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
            }}
          />
        </motion.div>

        <div>
          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              padding: "8px 14px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {product.category}
          </span>

          <h1
            style={{
              fontSize: isMobile ? "28px" : isTablet ? "34px" : "42px", // Sarlavha o'lchami ekranga moslashdi
              marginTop: "20px",
              marginBottom: "15px",
              lineHeight: "1.2",
            }}
          >
            {product.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: isMobile ? "26px" : "32px",
                fontWeight: "700",
                color: "#2563eb",
              }}
            >
              ${product.price}
            </span>

            <span
              style={{
                textDecoration: "line-through",
                color: "#888",
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              ${oldPrice}
            </span>

            <span
              style={{
                background: "#dcfce7",
                color: "#16a34a",
                padding: "5px 10px",
                borderRadius: "8px",
                fontWeight: "600",
              }}
            >
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>

          <p style={{ marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>
            Aniq reyting: {product.rating}
          </p>

          <p style={{ marginBottom: "12px" }}>
            📦 Omborda: {product.stock} dona
          </p>

          {product.brand && (
            <p style={{ marginBottom: "20px" }}>
              🏷️ Brend: {product.brand}
            </p>
          )}

          <p
            style={{
              color: "#555",
              lineHeight: "1.8",
              marginBottom: "30px",
              fontSize: isMobile ? "15px" : "16px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "30px",
              lineHeight: "2",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            <div>🚚 Bepul yetkazib berish</div>
            <div>🔒 Xavfsiz to'lov</div>
            <div>↩️ 14 kun ichida qaytarish</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row", // Tugmalar telefonda ustma-ust, kompyuterda yonma-yon bo'ladi
              gap: "15px",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product)}
              style={{
                padding: "16px 35px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "600",
                width: isMobile ? "100%" : "auto", // Tugma kengligi telefonda to'liq ekran bo'ladi
              }}
            >
              Savatchaga qo'shish
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              style={{
                padding: "16px 35px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "600",
                width: isMobile ? "100%" : "auto", // Tugma kengligi telefonda to'liq ekran bo'ladi
              }}
            >
              Hozir xarid qilish
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}