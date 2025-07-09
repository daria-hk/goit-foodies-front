const RecipeMainInfo = ({ data }) => (
  <div>
    <img src={data.image} alt={data.title} />
    <h2>{data.title}</h2>
    <div>Category: {data.category}</div>
    <p>{data.description}</p>
    <button type="button">Author: {data.author?.name}</button>
  </div>
);

export default RecipeMainInfo;
