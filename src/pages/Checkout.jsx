import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px 20px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        Buyurtma berish
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Yetkazib berish ma'lumotlari</h2>

          <input
            type="text"
            placeholder="To'liq ism"
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email manzil"
            required
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Telefon raqam"
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Yetkazib berish manzili"
            required
            rows="5"
            style={{
              ...inputStyle,
              resize: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Buyurtma berish
          </button>
        </form>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            height: "fit-content",
          }}
        >
          <h2>Buyurtma xulosasi</h2>

          <p style={{ marginTop: "15px" }}>
            Items: {cart.length}
          </p>

          <p style={{ marginTop: "10px" }}>
            Shipping: Free
          </p>

          <hr style={{ margin: "15px 0" }} />

          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "16px",
};