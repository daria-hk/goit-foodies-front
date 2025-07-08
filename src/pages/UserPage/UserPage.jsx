import { useEffect } from "react";
import css from "./UserPage.module.css";

export default function UserPage() {
  useEffect(() => {
    console.log("UserPage");
  }, []);

  return (
    <>
      <div className={css.recipePage}>
        <main>
          <h1>UserPage</h1>
        </main>
      </div>
    </>
  );
}
