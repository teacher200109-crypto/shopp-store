import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

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
        margin: "80px auto",
        padding: "0 20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "36px",
          fontWeight: "700",
        }}
      >
        Mashhur elektronika mahsulotlari
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <h3
              style={{
                margin: "15px 0",
                minHeight: "50px",
              }}
            >
              {product.title}
            </h3>

            <p
              style={{
                color: "#2563eb",
                fontWeight: "700",
                fontSize: "20px",
                marginBottom: "15px",
              }}
            >
              ${product.price}
            </p>

            <Link to={`/products/${product.id}`}>
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