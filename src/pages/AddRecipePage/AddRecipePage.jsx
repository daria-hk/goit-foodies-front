import css from "./AddRecipePage.module.css";
import { useEffect } from "react";

export default function AddRecipePage() {
  useEffect(() => {
    console.log("Catalog page");
  }, []);

  return (
    <>
      <div className={css.recipePage}>
        <main>
          <h1>Add RecipePage</h1>
        </main>
      </div>
    </>
  );
}
