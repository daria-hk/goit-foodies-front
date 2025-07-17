import css from "./RecipeCard.module.css";

const RecipeCard = ({
  recipe,
  isFavorite,
  onAuthorClick,
  onFavoriteToggle,
  onDetailsClick,
}) => (
  <div className={css.card}>
    <img src={recipe.thumb} alt={recipe.title} className={css.image} />
    <h3>{recipe.title}</h3>
    <p>{recipe.description}</p>
    <button type="button" onClick={onAuthorClick} className={css.authorBtn}>
      <img
        src={recipe.owner.avatar}
        alt={recipe.owner.name}
        className={css.authorAvatar}
      />
      <span>{recipe.owner.name}</span>
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
