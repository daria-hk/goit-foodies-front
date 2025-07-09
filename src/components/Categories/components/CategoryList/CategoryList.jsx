import css from "./CategoryList.module.css";

const CategoryList = ({ categories, onCategorySelect }) => {
  if (!categories?.length) return <div>Categories not found</div>;

  return (
    <ul className={css.list}>
      {categories.map((cat) => (
        <li key={cat.id} className={css.item}>
          <img src={cat.image} alt={cat.name} className={css.image} />
          <div className={css.name}>{cat.name}</div>
          <button
            type="button"
            onClick={() => onCategorySelect(cat)}
            title="Show recipes"
            className={css.arrowBtn}
          >
            ➡️
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
