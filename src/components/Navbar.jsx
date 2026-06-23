import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  // Mobil menyuni ochib-yopish uchun holat (state)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Link bosilganda menyu avtomatik yopilishi uchun funksiya
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          SHOPP-STORE
        </Link>

        {/* Mobil qurilmalar uchun Hamburger tugmasi */}
        <button className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* menuOpen true bo'lganda 'active' klassi qo'shiladi */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Bosh sahifa</Link>
          </li>

          <li>
            <Link to="/products" onClick={closeMenu}>Mahsulotlar</Link>
          </li>

          <li>
            <Link to="/wishlist" className="cart-link" onClick={closeMenu}>
              ❤️ Sevimlilar
              {wishlist.length > 0 && (
                <span className="cart-badge">{wishlist.length}</span>
              )}
            </Link>
          </li>

          <li>
            <Link to="/cart" className="cart-link" onClick={closeMenu}>
              🛒 Savatcha
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile" onClick={closeMenu}>👤 Profil</Link>
              </li>

              <li>
                <Link to="/admin" onClick={closeMenu}>⚙️ Admin</Link>
              </li>

              <li>
                <button className="logout-btn" onClick={() => { logout(); closeMenu(); }}>
                  Chiqish
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={closeMenu}>Kirish</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}