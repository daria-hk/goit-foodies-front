import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/usersSlice";

const Header = () => {
  const user = useSelector(selectUser);
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
