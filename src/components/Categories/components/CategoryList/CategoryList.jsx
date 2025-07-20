import css from "./CategoryList.module.css";
import { useState } from "react";
import { ShowMoreBtn } from "../Categories/ShowMoreBtn/ShowMoreBtn";
import { ListBtn } from "../Categories/ListBtn/ListBtn";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/slices/categoriesSlice";
import { allCategoriesImages } from "../../../../utils/loadCategoryImages";

const NUMBER_CAT_ELEMENTS = 11;

const CategoryList = ({ onCategorySelect }) => {
  const categories = useSelector(selectCategories);

  const mappedCategories = categories
    .filter((cat) => {
      // skeep categories without images
      return allCategoriesImages[cat.lowerName];
    })
    .map((cat) => {
      return {
        ...cat,
        url: `/category/${cat.lowerName}`,
        imgUrl: allCategoriesImages[cat.lowerName].normal,
        imgUrl2x: allCategoriesImages[cat.lowerName].retina,
        category: cat.name,
      };
    });

  const [numberCatElements, setNumberCatElements] =
    useState(NUMBER_CAT_ELEMENTS);

  const renderCategoryList = mappedCategories
    .filter((cat) => !!cat.imgUrl) //added a filter so that if there is no image, the category is not displayed.
    .slice(0, numberCatElements);

  const isExpanded = numberCatElements >= categories.length;

  const handlerShowMoreBtn = () => {
    if (isExpanded) {
      setNumberCatElements(NUMBER_CAT_ELEMENTS);
    } else {
      setNumberCatElements(categories.length);
    }
  };

  const buttonLabel = isExpanded
    ? "Show Less Categories"
    : "Show All Categories";

  if (!categories?.length) return <div>Categories not found</div>;

  return (
    <nav>
      <ul className={css.list}>
        {renderCategoryList.map((cat) => (
          <li key={cat.url} className={css.item}>
            <ListBtn
              category={cat.category}
              url={cat.url}
              imgUrl={cat.imgUrl}
              imgUrl2x={cat.imgUrl2x}
              onClick={() => onCategorySelect(cat)}
            >
              ➡️
            </ListBtn>
          </li>
        ))}
        <li>
          <ShowMoreBtn onClick={handlerShowMoreBtn}>{buttonLabel}</ShowMoreBtn>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryList;
