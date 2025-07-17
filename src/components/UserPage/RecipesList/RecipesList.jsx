import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectFavorites, selectRecipes } from "../../../redux/slices/recipesSlice.js";
import ItemsListContainer from "../ItemsListContainer/ItemsListContainer.jsx";
import RecipePreview from "../../Recipes/components/RecipePreview/RecipePreview.jsx";
import { removeRecipeFromFavorites, removeMyRecipe } from "../../../redux/ops/recipesOps.js";
import { useDispatch } from "react-redux";
import { selectFavoritesLoading, selectFavoritesError, selectRecipesIsLoading, selectRecipesError } from "../../../redux/slices/recipesSlice.js";

export default function RecipesList({ isFavorite = false, userId = { userId } }) {
    const items = useSelector(isFavorite ? selectFavorites : selectRecipes);
    const isLoading = useSelector(isFavorite ? selectFavoritesLoading : selectRecipesIsLoading);
    const error = useSelector(isFavorite ? selectFavoritesError : selectRecipesError);

    console.log(isLoading, error)
    const dispatch = useDispatch();
    const handleDelete = (recipeId) => {
        const fn = isFavorite ? removeRecipeFromFavorites : removeMyRecipe;
        dispatch(fn(recipeId))
    };


    return <ItemsListContainer getItemIdByIndex={(index) => items[index].id}>
        {items.map((item) => <RecipePreview key={item.id} recipe={item} onDelete={handleDelete} />)}
    </ItemsListContainer>;


}


RecipesList.propTypes = {
    isFavorite: PropTypes.bool,
    userId: PropTypes.string,
};