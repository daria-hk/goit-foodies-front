import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import SignInForm from "../Modal/SignInForm";
import SignUpForm from "../Modal/SignUpForm";
import { clearUsersError, closeSignInModal, openSignInModal, selectIsSignInOpen } from '../../redux/slices/usersSlice'

const AuthBar = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const dispatch = useDispatch();
  const isSignInOpen = useSelector(selectIsSignInOpen);

  const openSignIn = () => {
    dispatch(openSignInModal());
  };

  const openSignUp = () => {
    dispatch(clearUsersError());
    setIsSignUpOpen(true);
  };

  const closeSignIn = () => dispatch(closeSignInModal());
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
      <button onClick={openSignIn}>Sign in</button>
      <button onClick={openSignUp}>Sign up</button>

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
