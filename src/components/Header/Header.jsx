import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <header className={css.headerWrapper}>
      <Logo />
      <Navigation isAuth={isAuthenticated} />
      {isAuthenticated ? <UserBar /> : <AuthBar />}
    </header>
  );
};

export default Header;
