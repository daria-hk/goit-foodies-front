import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipeList.module.css";

const RecipeList = ({
  recipes,
  favorites,
  onAuthorClick,
  onFavoriteToggle,
  onDetailsClick,
}) => {
  if (!recipes?.length)
    return <div className={css.empty}>No recipes found</div>;
  return (
    <div className={css.list}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onAuthorClick={() => onAuthorClick(recipe.author)}
          onFavoriteToggle={() => onFavoriteToggle(recipe)}
          onDetailsClick={() => onDetailsClick(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
