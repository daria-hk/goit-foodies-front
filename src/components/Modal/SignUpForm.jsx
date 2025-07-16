import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { registerRequest } from "../../services/authService";
import styles from "./Modal.module.css";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";


const SignUpForm = ({ onClose }) => {
    console.log("SignUpForm mounted");
    
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      setLoading(true);
      setError(null);
      const { user, token } = await registerRequest(username, email, password);
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
      <h2>Sign Up</h2>
      <div className={styles.inputWrapper}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="username" type="text" placeholder="Username*" required />
        <input name="email" type="email" placeholder="Email*" required />
        <PasswordInput name="password" placeholder="Password" />
    </div>
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Sign up"}
      </button>
    </form>
  );
};

export default SignUpForm;
