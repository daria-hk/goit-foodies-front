import css from "./PathInfo.module.css";
const PathInfo = ({ currentPageName }) => (
  <nav className={css.pathInfo}>
    <a href="/">Home</a> / <span>{currentPageName}</span>
  </nav>
);

export default PathInfo;
