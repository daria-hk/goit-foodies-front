import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/components/Categories/Categories";
import Recipes from "../../components/Recipes/components/Recipes/Recipes";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/ops/categoriesOps";
import { fetchAreas } from "../../redux/ops/areasOps";
import { fetchIngredients } from "../../redux/ops/ingredientsOps";
import { fetchTestimonials } from "../../redux/ops/testimonialsOps";

export default function Home() {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const handleAddRecipeClick = () => {
    if (isAuth) {
      navigate("/recipe/add");
    } else {
      alert("Log in to add a recipe");
    }
  };

  return (
    <div className={css.wrapper}>
      <Hero onAddRecipeClick={handleAddRecipeClick} />
      {!selectedCategory && (
        <Categories error={error} onCategorySelect={setSelectedCategory} />
      )}
      {selectedCategory && (
        <Recipes
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}
