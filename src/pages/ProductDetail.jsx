import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        Mahsulot yuklanmoqda...
      </div>
    );
  }

  const oldPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "40px 20px",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
          background: "#fff",
          padding: "40px",
          borderRadius: "30px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >
        {/* IMAGE */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "550px",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
            }}
          />
        </motion.div>

        {/* INFO */}
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
              fontSize: "42px",
              marginTop: "20px",
              marginBottom: "15px",
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
                fontSize: "32px",
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
                fontSize: "18px",
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

          <p
            style={{
              marginBottom: "12px",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            ⭐ Reyting: {product.rating}
          </p>

          <p
            style={{
              marginBottom: "12px",
            }}
          >
            📦 Omborda: {product.stock} dona
          </p>

          {product.brand && (
            <p
              style={{
                marginBottom: "20px",
              }}
            >
              🏷️ Brend: {product.brand}
            </p>
          )}

          <p
            style={{
              color: "#555",
              lineHeight: "1.8",
              marginBottom: "30px",
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
            }}
          >
            <div>🚚 Bepul yetkazib berish</div>
            <div>🔒 Xavfsiz to'lov</div>
            <div>↩️ 14 kun ichida qaytarish</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              }}
            >
              Savatchaga qo'shish
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "16px 35px",
                background: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "600",
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