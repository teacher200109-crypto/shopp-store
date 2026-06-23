import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  
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
    const getProducts = async () => {
      try {
        const res = await API.get("/products?limit=200");

        const allowedCategories = [
          "smartphones",
          "laptops",
          "tablets",
          "mobile-accessories",
        ];

        const electronics = res.data.products
          .filter((product) =>
            allowedCategories.includes(product.category)
          )
          .slice(0, 4);

        setProducts(electronics);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: isMobile ? "40px auto" : "80px auto", // Mobil uchun margin kamaytirildi
        padding: isMobile ? "0 15px" : "0 20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: isMobile ? "25px" : "40px",
          fontSize: isMobile ? "26px" : "36px", // Sarlavha hajmi ekranga moslashdi
          fontWeight: "700",
          lineHeight: "1.3",
        }}
      >
        Mashhur elektronika mahsulotlari
      </h2>

      <div
        style={{
          display: "grid",
          // Kichik telefonlarda kartalar siqilib qolmasligi uchun minmax 240px qilindi
          gridTemplateColumns: isMobile 
            ? "repeat(auto-fit, minmax(240px, 1fr))" 
            : "repeat(auto-fit, minmax(250px, 1fr))",
          gap: isMobile ? "16px" : "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: isMobile ? "12px" : "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Tugmalarni pastki qismda tekislash uchun
            }}
          >
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: isMobile ? "180px" : "220px", // Telefonda rasm balandligi ixchamlashtirildi
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <h3
                style={{
                  margin: "15px 0 10px 0",
                  minHeight: isMobile ? "auto" : "50px", // Telefonda qatorlar orasidagi bo'shliq optimallashdi
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                {product.title}
              </h3>

              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "700",
                  fontSize: isMobile ? "18px" : "20px",
                  marginBottom: "15px",
                }}
              >
                ${product.price}
              </p>
            </div>

            <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  background: "#2563eb",
                  color: "#fff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: isMobile ? "14px" : "15px",
                }}
              >
                Mahsulotni ko'rish
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}