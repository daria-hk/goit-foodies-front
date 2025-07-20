import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/ops/usersOps";
import {
  selectUsersIsLoading,
  selectUsersError,
  selectUser,
} from "../../redux/slices/usersSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./Modal.module.css";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ додано

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignInForm = ({ onClose, onSwitchToSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ додано
  const user = useSelector(selectUser); // ✅ додано
  const loading = useSelector(selectUsersIsLoading);
  const error = useSelector(selectUsersError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      onClose();
    }
  };

  useEffect(() => {
    if (user?.id) {
      navigate(`/user/${user.id}`);
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.authorizationModal}>
      <h2>SIGN IN</h2>
      <div className={styles.inputWrapper}>
        <input {...register("email")} placeholder="Email*" />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <PasswordInput
          name="password"
          register={register}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        {error && <p className={styles.error}>{error}</p>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "SIGN IN"}
      </button>
      <div className={styles.switchAuth}>
        Don't have an account?
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className={styles.switchButton}
        >
          Create an account
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
