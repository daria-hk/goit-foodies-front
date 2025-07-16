import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginRequest } from "../../services/authService.js";
import styles from "./Modal.module.css";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";

const SignInForm = ({ onClose }) => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      setLoading(true);
      setError(null);
      const { user, token } = await loginRequest(email, password);
      login({ ...user, token });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authorizationModal}>
      <h2>Sign In</h2>
      <div className={styles.inputWrapper}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="email" type="email" placeholder="Email*" required />
        <PasswordInput name="password" placeholder="Password" />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
};

export default SignInForm;
