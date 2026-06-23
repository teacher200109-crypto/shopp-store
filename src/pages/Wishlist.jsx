import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

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

  if (wishlist.length === 0) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          padding: "0 20px",
          textAlign: "center", // Mobil telefonda matn markazda turadi
        }}
      >
        <h1 style={{ fontSize: isMobile ? "28px" : "36px" }}>❤️ Sevimlilar bo'sh</h1>

        <Link to="/products">
          <button
            style={{
              padding: "14px 30px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: isMobile ? "15px" : "16px",
            }}
          >
            Mahsulotlarni ko'rish
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: isMobile ? "20px 12px" : "30px 20px", // Mobil uchun chetki padding qisqartirildi
      }}
    >
      <h1
        style={{
          fontSize: isMobile ? "28px" : "42px", // Ekran kichrayganda sarlavha ham kichrayadi
          marginBottom: "25px",
          textAlign: isMobile ? "center" : "left", // Telefonda sarlavha o'rtaga joylashadi
        }}
      >
        ❤️ Sevimli mahsulotlar
      </h1>

      <div
        style={{
          display: "grid",
          // Agar ekran o'ta kichik bo'lsa (masalan 320px), minmax kartani siqib qo'ymaydi
          gridTemplateColumns: isMobile 
            ? "repeat(auto-fit, minmax(250px, 1fr))" 
            : "repeat(auto-fill, minmax(280px, 1fr))",
          gap: isMobile ? "16px" : "25px", // Telefonda kartalar orasidagi masofa biroz kamaytirildi
        }}
      >
        {wishlist.map((product) => (
          <motion.div
            key={product.id}
            whileHover={isMobile ? {} : { y: -5 }} // Telefonda hover effektini o'chiramiz (chunki sensor ekranda hover yo'q)
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: isMobile ? "15px" : "20px", // Karta ichidagi bo'shliq moslashuvchan bo'ldi
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: isMobile ? "180px" : "220px", // Rasm balandligi telefonda ixchamroq qilindi
                  objectFit: "cover",
                  borderRadius: "14px",
                }}
              />

              <h3
                style={{
                  marginTop: "15px",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                {product.title}
              </h3>

              <p
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  color: "#2563eb",
                  fontWeight: "700",
                  margin: "10px 0",
                }}
              >
                ${product.price}
              </p>
            </div>

            {/* Tugmalar bo'limi */}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#2563eb",
                  color: "#fff",
                  cursor: "pointer",
                  marginBottom: "10px",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "500",
                }}
              >
                Savatchaga qo'shish
              </button>

              <button
                onClick={() => removeFromWishlist(product.id)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#ef4444",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: isMobile ? "15px" : "16px",
                  fontWeight: "500",
                }}
              >
                O'chirish
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}