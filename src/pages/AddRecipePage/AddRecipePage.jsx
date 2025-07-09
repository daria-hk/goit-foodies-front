import MainTitle from "../../components/MainTitle/MainTitle";
import PathInfo from "../../components/Recipes/components/PathInfo/PathInfo";
import { useEffect } from "react";
import Subtitle from "../../components/Subtitle/Subtitle";
import css from "./AddRecipePage.module.css";
import AddRecipeForm from "../../components/Recipes/components/AddRecipeForm/AddRecipeForm";

export default function AddRecipePage() {
  useEffect(() => {
    console.log("Catalog page");
  }, []);

  return (
    <div className={css.recipePage}>
      <PathInfo currentPageName={"Add Recipe"} />
      <MainTitle>Add Recipe MainTitle</MainTitle>
      <Subtitle>Add Recipe Subtitle</Subtitle>
      <AddRecipeForm />
    </div>
  );
}
