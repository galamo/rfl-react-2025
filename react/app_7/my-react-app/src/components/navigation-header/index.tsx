import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./style.module.css";

export default function NavigationHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/countries" },
    { name: "Reports", path: "/reports" },
    { name: "useLayoutEffect", path: "/useLayoutEffect" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "UseRefRender", path: "/UseRefRender" },
    { name: "expenses", path: "/expenses" },
    { name: "suspensed-component", path: "/suspensed-component" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>My App</div>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.activeLink : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
