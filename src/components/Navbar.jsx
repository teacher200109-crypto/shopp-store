import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          SHOPP STORE
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Bosh sahifa</Link>
          </li>

          <li>
            <Link to="/products">Mahsulotlar</Link>
          </li>

          <li>
            <Link to="/cart" className="cart-link">
              Savatcha

              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}