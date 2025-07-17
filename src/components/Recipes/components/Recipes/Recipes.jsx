import MainTitle from "../../../MainTitle/MainTitle";
import Subtitle from "../../../Subtitle/Subtitle";
import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import RecipePagination from "../RecipePagination/RecipePagination";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { selectIngredients } from '@/redux/slices/ingredientsSlice.js'
import { selectAreas } from '@/redux/slices/areasSlice.js'
import { fetchRecipes } from '@/redux/ops/recipesOps';
import { selectRecipes, selectRecipesPage, selectRecipesPages, selectRecipesIsLoading, selectRecipesError } from '@/redux/slices/recipesSlice';

const Recipes = ({ category, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);

  const recipes = useSelector(selectRecipes);
  const responsePage = useSelector(selectRecipesPage);
  const totalPages = useSelector(selectRecipesPages);
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
    if (newPage < 1 || newPage > totalPages) return;
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
    <section>
      <button type="button" onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back
      </button>
      <MainTitle>Recipes{category ? `: ${category}` : ''}</MainTitle>
      <Subtitle>Select filters to search for recipes</Subtitle>
      <RecipeFilters
        ingredients={ingredients}
        regions={areas}
        selectedIngredient={selectedIngredient}
        selectedRegion={selectedRegion}
        onChange={handleFiltersChange}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!isLoading && !error && (
        <RecipeList
          recipes={recipes}
          favorites={favorites}
          onAuthorClick={handleAuthorClick}
          onFavoriteToggle={handleFavoriteToggle}
          onDetailsClick={handleDetailsClick}
        />
      )}
      {totalPages > 1 && (
        <RecipePagination
          page={responsePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Recipes;
