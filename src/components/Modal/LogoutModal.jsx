import { useAuth } from "../../context/AuthContext";
import styles from "./LogoutModal.module.css";

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>ARE YOU LOGGING OUT?</h2>
        <p className={styles.text}>You can always log back in at my time.</p>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          LOG OUT
        </button>
        <button className={styles.cancelBtn} onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
