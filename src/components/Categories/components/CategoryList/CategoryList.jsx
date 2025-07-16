import css from "./CategoryList.module.css";
import { useState } from "react";
import beef from "@/assets/img/categories/categories-beef.jpg";
import beef2x from "@/assets/img/categories/categories-beef@2x.jpg";
import breakfast from "@/assets/img/categories/categories-breakfast.jpg";
import breakfast2x from "@/assets/img/categories/categories-breakfast@2x.jpg";
import desserts from "@/assets/img/categories/categories-desserts.jpg";
import desserts2x from "@/assets/img/categories/categories-desserts@2x.jpg";
import goat from "@/assets/img/categories/categories-goat.jpg";
import goat2x from "@/assets/img/categories/categories-goat@2x.jpg";
import lamb from "@/assets/img/categories/categories-lamb.jpg";
import lamb2x from "@/assets/img/categories/categories-lamb@2x.jpg";
import miscellaneous from "@/assets/img/categories/categories-miscellaneous.jpg";
import miscellaneous2x from "@/assets/img/categories/categories-miscellaneous@2x.jpg";
import pasta from "@/assets/img/categories/categories-pasta.jpg";
import pasta2x from "@/assets/img/categories/categories-pasta@2x.jpg";
import pork from "@/assets/img/categories/categories-pork.jpg";
import pork2x from "@/assets/img/categories/categories-pork@2x.jpg";
import seafood from "@/assets/img/categories/categories-seafood.jpg";
import seafood2x from "@/assets/img/categories/categories-seafood@2x.jpg";
import side from "@/assets/img/categories/categories-side.jpg";
import side2x from "@/assets/img/categories/categories-side@2x.jpg";
import starter from "@/assets/img/categories/categories-starter.jpg";
import starter2x from "@/assets/img/categories/categories-starter@2x.jpg";
import vegan from "@/assets/img/categories/categories-vegan.jpg";
import vegan2x from "@/assets/img/categories/categories-vegan@2x.jpg";
import vegetarian from "@/assets/img/categories/categories-vegetarian.jpg";
import vegetarian2x from "@/assets/img/categories/categories-vegetarian@2x.jpg";
import { ShowMoreBtn } from "../Categories/ShowMoreBtn/ShowMoreBtn";
import { ListBtn } from "../Categories/ListBtn/ListBtn";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../redux/slices/categoriesSlice";

const CATEGORY_IMAGES = {
  5: { imgUrl: beef, imgUrl2x: beef2x, url: "/category/beef" },
  12: { imgUrl: breakfast, imgUrl2x: breakfast2x, url: "/category/breakfast" },
  6: { imgUrl: desserts, imgUrl2x: desserts2x, url: "/category/dessert" },
  14: { imgUrl: goat, imgUrl2x: goat2x, url: "/category/goat" },
  2: { imgUrl: lamb, imgUrl2x: lamb2x, url: "/category/lamb" },
  10: {
    imgUrl: miscellaneous,
    imgUrl2x: miscellaneous2x,
    url: "/category/miscellaneous",
  },
  11: { imgUrl: pasta, imgUrl2x: pasta2x, url: "/category/pasta" },
  8: { imgUrl: pork, imgUrl2x: pork2x, url: "/category/pork" },
  1: { imgUrl: seafood, imgUrl2x: seafood2x, url: "/category/seafood" },
  13: { imgUrl: side, imgUrl2x: side2x, url: "/category/side" },
  3: { imgUrl: starter, imgUrl2x: starter2x, url: "/category/starter" },
  7: { imgUrl: vegan, imgUrl2x: vegan2x, url: "/category/vegan" },
  9: {
    imgUrl: vegetarian,
    imgUrl2x: vegetarian2x,
    url: "/category/vegetarian",
  },
}; //консстанта для того щоб зробити правильний мепінг в комбінації з тим що отримали з беку і що маємо у фронті
const NUMBER_CAT_ELEMENTS = 11;

const CategoryList = () => {
  const categories = useSelector(selectCategories);

  const mappedCategories = categories.map((cat) => {
    const mapping = CATEGORY_IMAGES[cat.id] || {};
    return {
      ...cat,
      url: mapping.url || `/category/${cat.name?.toLowerCase() || "unknown"}`,
      imgUrl: mapping.imgUrl,
      imgUrl2x: mapping.imgUrl2x,
      category: cat.name,
    };
  });

  const [numberCatElements, setNumberCatElements] =
    useState(NUMBER_CAT_ELEMENTS);

  const renderCategoryList = mappedCategories
    .filter((cat) => !!cat.imgUrl) //додала фільтр на те якщо немає зображення, то категорія не відображається
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
