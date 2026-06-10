import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { addToCart } = useCart();

  const categoryTranslations = {
    smartphones: "Smartfonlar",
    laptops: "Noutbuklar",
    tablets: "Planshetlar",
    "mobile-accessories": "Telefon aksessuarlari",
  };

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

        const filtered = res.data.products.filter((product) =>
          allowedCategories.includes(product.category)
        );

        setProducts(filtered);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
        Mahsulotlar yuklanmoqda...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "30px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        Elektronika do'koni
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            minWidth: "250px",
            fontSize: "16px",
            background: "#fff",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all"
                ? "Barcha kategoriyalar"
                : categoryTranslations[category]}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(280px,1fr))",
          gap: "25px",
        }}
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -8,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                Yangi
              </span>

              <span
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                -{Math.round(product.discountPercentage || 10)}%
              </span>
            </div>

            <motion.img
              src={product.thumbnail}
              alt={product.title}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
                borderRadius: "14px",
              }}
            />

            <h3
              style={{
                marginTop: "15px",
                marginBottom: "10px",
                minHeight: "55px",
              }}
            >
              {product.title}
            </h3>

            <p
              style={{
                color: "#666",
                marginBottom: "10px",
              }}
            >
              {categoryTranslations[product.category]}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              ⭐ {product.rating}
            </div>

            <p
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#2563eb",
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
                  marginBottom: "10px",
                  borderRadius: "10px",
                  border: "2px solid #2563eb",
                  background: "#fff",
                  color: "#2563eb",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Tafsilotlarni ko'rish
              </button>
            </Link>

            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Savatchaga qo'shish
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}