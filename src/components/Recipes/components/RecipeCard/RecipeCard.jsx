import css from "./RecipeCard.module.css";

const RecipeCard = ({
  recipe,
  isFavorite,
  onAuthorClick,
  onFavoriteToggle,
  onDetailsClick,
}) => (
  <div className={css.card}>
    <img src={recipe.image} alt={recipe.title} className={css.image} />
    <h3>{recipe.title}</h3>
    <p>{recipe.description}</p>
    <button type="button" onClick={onAuthorClick} className={css.authorBtn}>
      <img
        src={recipe.author.avatar}
        alt={recipe.author.name}
        className={css.authorAvatar}
      />
      <span>{recipe.author.name}</span>
    </button>
    <div className={css.actions}>
      <button
        type="button"
        onClick={onFavoriteToggle}
        title="Add/remove from favorites"
        className={css.favoriteBtn}
      >
        <span
          className={
            isFavorite
              ? `${css.favoriteIcon} ${css.favoriteIconActive}`
              : css.favoriteIcon
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </button>
      <button
        type="button"
        onClick={onDetailsClick}
        title="Recipe details"
        className={css.detailsBtn}
      >
        ➡️
      </button>
    </div>
  </div>
);

export default RecipeCard;
