import Logo from "../Logo/Logo";
import NetworkLinks from "../NetworkLinks/NetworkLinks";

const Footer = () => (
  <footer>
    <Logo />
    <NetworkLinks />
    <p>© {new Date().getFullYear()} Foodies. All rights reserved.</p>
  </footer>
);

export default Footer;
