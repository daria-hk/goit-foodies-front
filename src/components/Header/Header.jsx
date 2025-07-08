import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";

const isAuthenticated = false;

const Header = () => (
  <header className={css.headerWrapper}>
    <Logo />
    <Navigation isAuth={isAuthenticated} />
    {isAuthenticated ? <UserBar /> : <AuthBar />}
  </header>
);

export default Header;
