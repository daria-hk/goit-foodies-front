import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      // якщо ми вже на головній — гасимо перехід
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoFooter} onClick={handleLogoClick}>
          <Logo />
        </Link>
        <NetworkLinks className={styles.networkLinks} />
      </div>

      <hr className={styles.divider} />

      <p className={styles.copy}>
        © {new Date().getFullYear()}, Foodies. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
