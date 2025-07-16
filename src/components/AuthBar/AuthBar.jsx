// components/AuthBar.jsx
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SignInForm from "../Modal/SignInForm";
import SignUpForm from "../Modal/SignUpForm";
import { useAuth } from "../../context/AuthContext";

const AuthBar = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div>
      {!user ? (
        <>
          <button onClick={() => setIsSignInOpen(true)}>Sign in</button>
          <button onClick={() => setIsSignUpOpen(true)}>Sign up</button>
        </>
      ) : (
        <>
          <span style={{ marginRight: "10px" }}>
            👋 Welcome, {user.username || user.email}
          </span>
          <button onClick={() => setIsLogoutOpen(true)}>Logout</button>
          <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
        </>
      )}

      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
        <SignInForm onClose={() => setIsSignInOpen(false)} />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUpForm onClose={() => setIsSignUpOpen(false)} />
      </Modal>
    </div>
  );
};

export default AuthBar;