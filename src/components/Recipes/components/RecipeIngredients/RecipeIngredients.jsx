const RecipeIngredients = ({ ingredients }) => (
  <ul>
    {ingredients.map((item, idx) => (
      <li key={idx}>
        <img src={item.image} alt={item.name} />
        <span>{item.name}</span> - <span>{item.amount}</span>
      </li>
    ))}
  </ul>
);

export default RecipeIngredients;
