import css from './RecipeInfo.module.css';
import RecipeMainInfo from "../RecipeMainInfo/RecipeMainInfo";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import RecipePreparation from "../RecipePreparation/RecipePreparation";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import { addRecipeToFavorites,removeRecipeFromFavorites, fetchFavoriteRecipes } from "../../../../redux/ops/recipesOps"
import {
  selectCurrentRecipe,
selectFavorites,
  // selectRecipesIsLoading,
  // selectRecipesError
} from "../../../../redux/slices/recipesSlice";


const RecipeInfo = ({ data }) => {
  
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector(selectCurrentRecipe);
  const favoritesList = useSelector(selectFavorites);
  // const isLoading = useSelector(selectRecipesIsLoading);
  const isFavoriteById = favoritesList?.some(item => String(item.id) === String(id)) === true;
 


  
  const onToggleFavorites = () => {
    if (!recipe) return;
    console.log("Click",isFavoriteById)
         if (!isFavoriteById){
                dispatch(addRecipeToFavorites(id))
                    .then(response => {
                        if (response.error) {
                            console.error('Failed to add to favorites:', response.error.message);
                        } else {
                            dispatch(fetchFavoriteRecipes());
                        }
                    })
                    .catch(error => {
                        console.error('Error adding to favorites:', error);
                    });
            } else {
                dispatch(removeRecipeFromFavorites(id))
                    .then(response => {
                        if (response.error) {
                            console.error('Failed to remove from favorites:', response.error.message);
                        } else {
                            dispatch(fetchFavoriteRecipes());
                        }
                    })
                    .catch(error => {
                        console.error('Error removing from favorites:', error);
                    });
            }
  };

  
 return (
  <section className={css.sectionWrapper}>
  <div className={css.recipeWrapper}>
    <img
      src={data.thumb}
      alt={data.title}
      className={css.recipeImg}
      width={551}
      height={400}
    />

    <div className={css.recipeDetails}>
      <RecipeMainInfo data={data} />
      <RecipeIngredients ingredients={data.ingredients} />
      <RecipePreparation
        preparation={data.instructions}
        onFavoriteToggle={onToggleFavorites}
        isFavorite={isFavoriteById}
      />
    </div>
  </div>
</section>  
  );
};

export default RecipeInfo;
