import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { setExpenseLimit } from "../../store/slices/settingsSlice";

export default function NavigationHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch()
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/countries" },
    { name: "Reports", path: "/reports" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "expenses", path: "/expenses" },
    { name: "Settings", path: "/settings" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>My App</div>
        <button onClick={() => {
          dispatch(setExpenseLimit(10))
        }}>
          Reset
        </button>
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
              className={`${styles.navLink} ${location.pathname === item.path ? styles.activeLink : ""
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
