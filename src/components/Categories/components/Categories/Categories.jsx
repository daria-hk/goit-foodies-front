import MainTitle from "../../../MainTitle/MainTitle";
import Subtitle from "../../../Subtitle/Subtitle";
import CategoryList from "../CategoryList/CategoryList";

const Categories = ({ categories, onCategorySelect, error }) => (
  <section>
    <MainTitle>MainTitle Categories</MainTitle>
    <Subtitle>Subtitle Categories</Subtitle>
    {error && <div style={{ color: "red" }}>{error}</div>}
    <CategoryList categories={categories} onCategorySelect={onCategorySelect} />
  </section>
);

export default Categories;
