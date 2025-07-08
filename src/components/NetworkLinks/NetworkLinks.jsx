import React from "react";
import css from "./NetworkLinks.module.css";

const NetworkLinks = () => (
  <div className={css.linksWrapper}>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      Facebook
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      Instagram
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      YouTube
    </a>
  </div>
);

export default NetworkLinks;
