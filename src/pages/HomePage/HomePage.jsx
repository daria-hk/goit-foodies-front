import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/components/Categories/Categories";
import Recipes from "../../components/Recipes/components/Recipes/Recipes";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../../redux/ops/recipesOps";
import { fetchCategories } from "../../redux/ops/categoriesOps";
import { fetchAreas } from "../../redux/ops/areasOps";
import { fetchIngredients } from "../../redux/ops/ingredientsOps";
import { fetchTestimonials } from "../../redux/ops/testimonialsOps";
import { fetchUserById } from "../../redux/ops/usersOps";

export default function Home() {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const state = useSelector((state) => state);
  console.log(state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());
    dispatch(fetchTestimonials());
    dispatch(fetchUserById("1")); //test id
  }, [dispatch]);

  useEffect(() => {
    // TODO: replace with real request
    async function fetchCategories() {
      try {
        setError("");
        // Mock data
        const data = [
          {
            id: 1,
            name: "Salads",
            image: "https://via.placeholder.com/200x100?text=Salads",
          },
          {
            id: 2,
            name: "Soups",
            image: "https://via.placeholder.com/200x100?text=Soups",
          },
          {
            id: 3,
            name: "Desserts",
            image: "https://via.placeholder.com/200x100?text=Desserts",
          },
        ];
        setCategories(data);
      } catch {
        setError("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  const handleAddRecipeClick = () => {
    if (isAuth) {
      navigate("/recipe/add");
    } else {
      alert("Log in to add a recipe");
    }
  };

  const handleCategorySelect = async (cat) => {
    try {
      setError("");
      // TODO: Request recipes for selected category cat.id
      // If successful — setSelectedCategory(cat)
      setSelectedCategory(cat);
    } catch {
      setError("Failed to load recipes for this category");
    }
  };

  return (
    <div className={css.wrapper}>
      <Hero onAddRecipeClick={handleAddRecipeClick} />
      {!selectedCategory && (
        <Categories
          categories={categories}
          onCategorySelect={handleCategorySelect}
          error={error}
        />
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
