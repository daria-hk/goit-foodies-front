import css from './CategoryList.module.css';
import { useState } from 'react';
import beef from '@/assets/img/categories/categories-beef.jpg';
import beef2x from '@/assets/img/categories/categories-beef@2x.jpg';
import breakfast from '@/assets/img/categories/categories-breakfast.jpg';
import breakfast2x from '@/assets/img/categories/categories-breakfast@2x.jpg';
import desserts from '@/assets/img/categories/categories-desserts.jpg';
import desserts2x from '@/assets/img/categories/categories-desserts@2x.jpg';
import goat from '@/assets/img/categories/categories-goat.jpg';
import goat2x from '@/assets/img/categories/categories-goat@2x.jpg';
import lamb from '@/assets/img/categories/categories-lamb.jpg';
import lamb2x from '@/assets/img/categories/categories-lamb@2x.jpg';
import miscellaneous from '@/assets/img/categories/categories-miscellaneous.jpg';
import miscellaneous2x from '@/assets/img/categories/categories-miscellaneous@2x.jpg';
import pasta from '@/assets/img/categories/categories-pasta.jpg';
import pasta2x from '@/assets/img/categories/categories-pasta@2x.jpg';
import pork from '@/assets/img/categories/categories-pork.jpg';
import pork2x from '@/assets/img/categories/categories-pork@2x.jpg';
import seafood from '@/assets/img/categories/categories-seafood.jpg';
import seafood2x from '@/assets/img/categories/categories-seafood@2x.jpg';
import side from '@/assets/img/categories/categories-side.jpg';
import side2x from '@/assets/img/categories/categories-side@2x.jpg';
import starter from '@/assets/img/categories/categories-starter.jpg';
import starter2x from '@/assets/img/categories/categories-starter@2x.jpg';
import vegan from '@/assets/img/categories/categories-vegan.jpg';
import vegan2x from '@/assets/img/categories/categories-vegan@2x.jpg';
import vegetarian from '@/assets/img/categories/categories-vegetarian.jpg';
import vegetarian2x from '@/assets/img/categories/categories-vegetarian@2x.jpg';
import { ShowMoreBtn } from '../Categories/ShowMoreBtn/ShowMoreBtn';
import { ListBtn } from '../Categories/ListBtn/ListBtn';

const CATEGORIES = [
  {
    category: 'Beef',
    url: '/category/beef',
    imgUrl: beef,
    imgUrl2x: beef2x,
  },
  {
    category: 'Breakfast',
    url: '/category/breakfast',
    imgUrl: breakfast,
    imgUrl2x: breakfast2x,
  },
  {
    category: 'Desserts',
    url: '/category/dessert',
    imgUrl: desserts,
    imgUrl2x: desserts2x,
  },
  {
    category: 'Lamb',
    url: '/category/lamb',
    imgUrl: lamb,
    imgUrl2x: lamb2x,
  },
  {
    category: 'Goat',
    url: '/category/goat',
    imgUrl: goat,
    imgUrl2x: goat2x,
  },
  {
    category: 'Miscellaneous',
    url: '/category/miscellaneous',
    imgUrl: miscellaneous,
    imgUrl2x: miscellaneous2x,
  },
  {
    category: 'Pasta',
    url: '/category/pasta',
    imgUrl: pasta,
    imgUrl2x: pasta2x,
  },
  {
    category: 'Pork',
    url: '/category/pork',
    imgUrl: pork,
    imgUrl2x: pork2x,
  },
  {
    category: 'Seafood',
    url: '/category/seafood',
    imgUrl: seafood,
    imgUrl2x: seafood2x,
  },
  {
    category: 'Side',
    url: '/category/side',
    imgUrl: side,
    imgUrl2x: side2x,
  },
  {
    category: 'Starter',
    url: '/category/starter',
    imgUrl: starter,
    imgUrl2x: starter2x,
  },
  {
    category: 'Vegan',
    url: '/category/vegan',
    imgUrl: vegan,
    imgUrl2x: vegan2x,
  },
  {
    category: 'Vegetarian',
    url: '/category/vegetarian',
    imgUrl: vegetarian,
    imgUrl2x: vegetarian2x,
  },
];

const NUMBER_CAT_ELEMENTS = 11;

const CategoryList = () => {
  const [numberCatElements, setNumberCatElements] =
    useState(NUMBER_CAT_ELEMENTS);

  const renderCategoryList = CATEGORIES.slice(0, numberCatElements);

  const isExpanded = numberCatElements >= CATEGORIES.length;

  const handlerShowMoreBtn = () => {
    if (isExpanded) {
      setNumberCatElements(NUMBER_CAT_ELEMENTS);
    } else {
      setNumberCatElements(CATEGORIES.length);
    }
  };

  const buttonLabel = isExpanded
    ? 'Show Less Categories'
    : 'Show All Categories';

  if (!CATEGORIES?.length) return <div>Categories not found</div>;

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
