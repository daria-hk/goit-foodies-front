import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import SignInForm from "../Modal/SignInForm";
import SignUpForm from "../Modal/SignUpForm";
import { clearUsersError } from "../../redux/slices/usersSlice";
import css from "./AuthBar.module.css";

const AuthBar = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const dispatch = useDispatch();

  const openSignIn = () => {
    dispatch(clearUsersError());
    setIsSignInOpen(true);
  };

  const openSignUp = () => {
    dispatch(clearUsersError());
    setIsSignUpOpen(true);
  };

  const closeSignIn = () => setIsSignInOpen(false);
  const closeSignUp = () => setIsSignUpOpen(false);

  const switchToSignUp = () => {
    closeSignIn();
    openSignUp();
  };

  const switchToSignIn = () => {
    closeSignUp();
    openSignIn();
  };

  return (
    <div>
      <div className={css.authBar}>
        <button onClick={openSignIn} className={css.signInButton}>
          Sign in
        </button>
        <button onClick={openSignUp} className={css.signUpButton}>
          Sign up
        </button>
      </div>

      <Modal isOpen={isSignInOpen} onClose={closeSignIn}>
        <SignInForm onClose={closeSignIn} onSwitchToSignUp={switchToSignUp} />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={closeSignUp}>
        <SignUpForm onClose={closeSignUp} onSwitchToSignIn={switchToSignIn} />
      </Modal>
    </div>
  );
};

export default AuthBar;
