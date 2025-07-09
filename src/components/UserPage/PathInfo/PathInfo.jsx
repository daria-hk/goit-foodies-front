const PathInfo = ({ currentPageName }) => (
  <nav>
    <a href="/">Home</a> / <span>{currentPageName}</span>
  </nav>
);

export default PathInfo;
