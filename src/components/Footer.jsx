export default function Footer() {
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#fff",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "50px 20px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        <div>
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            SHOPP STORE
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
            }}
          >
            Smartfonlar, noutbuklar, planshetlar va
            aksessuarlarni eng yaxshi narxlarda xarid
            qiling.
          </p>
        </div>

        <div>
          <h3>Bo'limlar</h3>

          <p>🏠 Bosh sahifa</p>
          <p>📱 Mahsulotlar</p>
          <p>🛒 Savatcha</p>
        </div>

        <div>
          <h3>Aloqa</h3>

          <p>📍 Qahqadaryo, O'zbekiston</p>
          <p>📞 +998 90 123 45 67</p>
          <p>✉️ info@shoppstore.uz</p>
        </div>

        <div>
          <h3>Ijtimoiy tarmoqlar</h3>

          <p>📘 Facebook</p>
          <p>📸 Instagram</p>
          <p>📢 Telegram</p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          padding: "20px",
          color: "#94a3b8",
        }}
      >
        © 2026 SHOPP STORE | Barcha huquqlar himoyalangan
      </div>
    </footer>
  );
}