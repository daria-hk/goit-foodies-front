import MainTitle from "../../components/MainTitle/MainTitle";
import PathInfo from "../../components/Common/PathInfo/PathInfo";
import { useEffect } from "react";
import Subtitle from "../../components/Subtitle/Subtitle";
import css from "./AddRecipePage.module.css";
import AddRecipeForm from "../../components/Recipes/components/AddRecipeForm/AddRecipeForm";

export default function AddRecipePage() {
  useEffect(() => {
    console.log("Catalog page");
  }, []);

  return (
    <div className="container">
      <PathInfo currentPageName={"Add Recipe"} />
      <MainTitle className={css.maintitle}>Add recipe</MainTitle>
      <Subtitle className={css.subtitle}>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>
      <AddRecipeForm />
    </div>
  );
}
