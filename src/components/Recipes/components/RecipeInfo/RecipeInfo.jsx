import RecipeMainInfo from "../RecipeMainInfo/RecipeMainInfo";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import RecipePreparation from "../RecipePreparation/RecipePreparation";

const RecipeInfo = ({ data }) => (
  <section>
    <RecipeMainInfo data={data} />
    <RecipeIngredients ingredients={data.ingredients || []} />
    <RecipePreparation preparation={data.preparation || {}} />
  </section>
);

export default RecipeInfo;
