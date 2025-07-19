import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites } from '@/redux/slices/recipesSlice';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '@/redux/ops/recipesOps';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isInFavorites = (recipe) =>
    favorites?.some(fav => parseInt(fav.id) === parseInt(recipe.id));

  const toggleFavorite = (recipe) => {
    if (isInFavorites(recipe)) {
      dispatch(removeRecipeFromFavorites(recipe.id));
    } else {
      dispatch(addRecipeToFavorites(recipe.id));
    }
  };

  return {
    favorites,
    isInFavorites,
    toggleFavorite
  };
};