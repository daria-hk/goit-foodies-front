import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      {}
      <Link to="/" className={styles.logoFooter}>
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

export default Footer;
