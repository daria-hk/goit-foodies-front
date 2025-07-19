import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites, selectPopularRecipes } from '@/redux/slices/recipesSlice'
import { fetchRecipesPopular } from '@/redux/ops/recipesOps';

import RecipeCard from '../RecipeCard/RecipeCard';

import css from './PopularRecipes.module.css';

const PopularRecipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popularRecipes = useSelector(selectPopularRecipes);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    console.log('rrr');
    if (!popularRecipes?.length) {
      dispatch(fetchRecipesPopular());
    }
  }, [popularRecipes, dispatch]);

  const handleAuthorClick = (author) => {
    // TODO: if not authorized — Modal, else navigate(`/user/${author.id}`)
    alert(`Go to author profile: ${author.name}`);
  };

  const handleFavoriteToggle = (recipe) => {
    // TODO: update favorites
  };

  const handleDetailsClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`)
  };

  if (!Array.isArray(popularRecipes) || !popularRecipes.length) {
    return (
      <div className={css.container}>
        <h3 className={css.title}>POPULAR RECIPES</h3>
        <p>No popular recipes found.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h3 className={css.title}>POPULAR RECIPES</h3>
      <div className={css.list}>
        {popularRecipes.map(recipe => {
          if (!recipe?.id) return null;

          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              author={recipe.user}
              isFavorite={favorites.includes(recipe.id)}
              onFavoriteToggle={() => handleFavoriteToggle(recipe)}
              onAuthorClick={() => handleAuthorClick(recipe.owner)}
              onDetailsClick={() => handleDetailsClick(recipe)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularRecipes;
