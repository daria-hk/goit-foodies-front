import { useEffect } from "react";
import css from "./RecipePage.module.css";

export default function RecipePage() {
  useEffect(() => {
    console.log("RecipePage");
  }, []);

  return (
    <>
      <div className={css.recipePage}>
        <main>
          <h1>RecipePage</h1>
        </main>
      </div>
    </>
  );
}
