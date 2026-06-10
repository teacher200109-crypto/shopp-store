import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        ✅
      </h1>

      <h2>Buyurtma muvaffaqiyatli berildi!</h2>

      <p
        style={{
          marginTop: "15px",
          color: "#666",
        }}
      >
        Xaridingiz uchun rahmat!
      </p>

      <Link to="/products">
        <button
          style={{
            marginTop: "25px",
            padding: "14px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Xaridni davom ettirish
        </button>
      </Link>
    </div>
  );
}