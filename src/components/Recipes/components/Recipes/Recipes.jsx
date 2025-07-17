import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import RecipePagination from "../RecipePagination/RecipePagination";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { selectIngredients } from '@/redux/slices/ingredientsSlice.js'
import { selectAreas } from '@/redux/slices/areasSlice.js'
import { fetchRecipes } from '@/redux/ops/recipesOps';
import { selectRecipes, selectRecipesIsLoading, selectRecipesError } from '@/redux/slices/recipesSlice';
import css from "./Recipes.module.css";

const Recipes = ({ category, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);

  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectRecipesIsLoading);
  const error = useSelector(selectRecipesError);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecipes({
      category: category ? category.id : null,
      ingredient: selectedIngredient ? selectedIngredient.id : null,
      region: selectedRegion ? selectedRegion.id : null,
      page
    }));
  }, [category, selectedIngredient, selectedRegion, page, dispatch]);

  const handleFiltersChange = ({ ingredient, region }) => {
    setSelectedIngredient(ingredient);
    setSelectedRegion(region);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthorClick = (author) => {
    // TODO: if not authorized — Modal, else navigate(`/user/${author.id}`)
    alert(`Go to author profile: ${author.name}`);
  };

  const handleFavoriteToggle = (recipe) => {
    // TODO: Request to backend, update favorites
    setFavorites((favs) =>
      favs.includes(recipe.id)
        ? favs.filter((id) => id !== recipe.id)
        : [...favs, recipe.id]
    );
  };

  const handleDetailsClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`)
  };

  return (
    <section className={css.recipesSection}>
      <div className={css.titleWrapper}>
        <button type="button" onClick={onBack} className={css.backButton}>
          ← Back
        </button>
        <h2 className={css.categoryTitle}>{category.name}</h2>
        <p className={css.categoryDescription}>{category.desc}</p>
      </div>
      <div className={css.recipesWrapper}>
        <RecipeFilters
          ingredients={ingredients}
          regions={areas}
          selectedIngredient={selectedIngredient}
          selectedRegion={selectedRegion}
          onChange={handleFiltersChange}
        />
        <div className={css.recipesListWrapper}>
          {isLoading && <div className={css.loadingPlaceholder}>Loading...</div>}
          {error && <div className={css.errorMessage}>{error}</div>}
          {!isLoading && !error && (
            <RecipeList
              recipes={recipes}
              favorites={favorites}
              onAuthorClick={handleAuthorClick}
              onFavoriteToggle={handleFavoriteToggle}
              onDetailsClick={handleDetailsClick}
            />
          )}
          <RecipePagination onPageChange={handlePageChange} />
        </div>
      </div>
    </section>
  );
};

export default Recipes;
