const RecipePreparation = ({ preparation }) => (
  <div>
    <div>{preparation.description}</div>
    <button type="button">Add to favorites</button>
    {/* If already favorite, show Remove from favorites instead */}
  </div>
);

export default RecipePreparation;
