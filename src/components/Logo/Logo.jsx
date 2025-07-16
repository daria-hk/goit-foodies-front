import React from "react";
import sprite from "../../assets/img/sprite.svg";
import styles from "./Logo.module.css";

const Logo = () => (
  <div>
    <svg
      className={styles.logoIcon}
      aria-hidden="true"
    >
      <use href={`${sprite}#icon-logo`} />
    </svg>
  </div>
);

export default Logo;
