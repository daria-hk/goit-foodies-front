import css from "./HomePage.module.css";
import { NavLink } from "react-router";

export default function Home() {
  return (
    <div className={css.wrapper}>
      <h1>Recipe</h1>
      <NavLink to="/recipe/add">
        <button>Add recipe</button>
      </NavLink>
    </div>
  );
}
