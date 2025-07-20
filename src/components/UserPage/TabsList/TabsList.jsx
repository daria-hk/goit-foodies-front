import styles from "./TabsList.module.css";
import ListItems, { USER_LIST_ITEMS_VARIANTS } from "../ListItems/ListItems";
import ListPagination from "../ListPagination/ListPagination";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRecipes } from "../../../redux/ops/userRecipesOps";
import { fetchFavoriteRecipes } from "../../../redux/ops/recipesOps";
import { fetchUserFollowers, fetchUserFollowees } from "../../../redux/ops/usersOps";
import Loader from "../../Loader/Loader";
import {
  selectFavorites,
  selectFavoritesTotalPages,
  selectFavoritesIsLoading,
  selectFavoritesError,
  selectFavoritesPage,
} from "../../../redux/slices/recipesSlice";
import {
  selectUserRecipes,
  selectUserRecipesTotalPages,
  selectUserRecipesIsLoading,
  selectUserRecipesError,
  selectUserRecipesPage,
} from "../../../redux/slices/userResipesSlice";
import {
  selectUserFollowers,
  selectUserFollowersTotalPages,
  selectUserFollowersIsLoading,
  selectUserFollowersError,
  selectUserFollowees,
  selectUserFolloweesTotalPages,
  selectUserFolloweesIsLoading,
  selectUserFolloweesError,
  selectUserFollowersPage,
  selectUserFolloweesPage,
} from "../../../redux/slices/usersSlice";

function selectSelectors(variant, userId, page = 1) {
  switch (variant) {
    case USER_LIST_ITEMS_VARIANTS.favorites:
      return {
        load: () => fetchFavoriteRecipes(),
        items: selectFavorites,
        totalPages: selectFavoritesTotalPages,
        page: selectFavoritesPage,
        isLoading: selectFavoritesIsLoading,
        error: selectFavoritesError,
      };
    case USER_LIST_ITEMS_VARIANTS.followers:
      return {
        load: () => fetchUserFollowers(userId),
        items: selectUserFollowers,
        totalPages: selectUserFollowersTotalPages,
        page: selectUserFollowersPage,
        isLoading: selectUserFollowersIsLoading,
        error: selectUserFollowersError,
      };
    case USER_LIST_ITEMS_VARIANTS.following:
      return {
        load: () => fetchUserFollowees(),
        items: selectUserFollowees,
        totalPages: selectUserFolloweesTotalPages,
        page: selectUserFolloweesPage,
        isLoading: selectUserFolloweesIsLoading,
        error: selectUserFolloweesError,
      };

    // USER_LIST_ITEMS_VARIANTS.recipes:
    default:
      return {
        load: () => fetchUserRecipes({ userId, page }),
        items: selectUserRecipes(userId),
        totalPages: selectUserRecipesTotalPages(userId),
        page: selectUserRecipesPage(userId),
        isLoading: selectUserRecipesIsLoading(userId),
        error: selectUserRecipesError(userId),
      };
  }
}

const TabsList = ({ userId, isCurrent = false }) => {
  const tabs = [
    { id: USER_LIST_ITEMS_VARIANTS.recipes, label: "My recipes" },
    { id: USER_LIST_ITEMS_VARIANTS.followers, label: "My followers" },
  ];
  if (isCurrent) {
    tabs.push({ id: USER_LIST_ITEMS_VARIANTS.following, label: "My following" });
    tabs.push({ id: USER_LIST_ITEMS_VARIANTS.favorites, label: "My favorites" });
  }


  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(USER_LIST_ITEMS_VARIANTS.favorites);

  const selectors = selectSelectors(activeTab, userId);

  useEffect(() => {
    if (selectors.load) {
      dispatch(selectors.load());
    }
  }, [dispatch, userId, activeTab]);

  const items = useSelector(selectors.items);
  const itemsIsLoading = useSelector(selectors.isLoading);
  const itemsError = useSelector(selectors.error);
  const totalPages = useSelector(selectors.totalPages);
  const page = useSelector(selectors.page);

  return (
    <div>
      <div className={styles.tabsWrapper}>
        {tabs.map((tab) => (
          <button className={styles.tabsList} key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {
        itemsIsLoading && <Loader />
      }

      {!itemsIsLoading && !itemsError &&
        <>
          <ListItems variant={activeTab} items={items} />
          <ListPagination variant={"all"} totalPages={totalPages} page={page} />
        </>
      }

    </div>
  );
};


TabsList.propTypes = {
  userId: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default TabsList;
