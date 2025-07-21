import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import RecipePreview from "../../Recipes/components/RecipePreview/RecipePreview.jsx";
import UserCard from "../UserCard/UserCard.jsx";
import css from "./ListItems.module.css";
import { removeRecipe, fetchMyRecipes } from "../../../redux/ops/recipesOps.js";
import { toast } from "react-toastify";

export const USER_LIST_ITEMS_VARIANTS = {
  recipes: "recipes",
  favorites: "favorites",
  followers: "followers",
  following: "following",
};

const USER_LIST_RECIPE_VARIANTS = new Set([
  USER_LIST_ITEMS_VARIANTS.recipes,
  USER_LIST_ITEMS_VARIANTS.favorites,
]);

const ListItems = ({ variant, items = [] }) => {
  const dispatch = useDispatch();
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const isRecipeList = USER_LIST_RECIPE_VARIANTS.has(variant);
  const isUserList = !isRecipeList;

  const tabType = variant.toLowerCase();

  const handleDelete = async (recipeId) => {
    try {
      setLocalItems((prevItems) =>
        prevItems.filter((item) => item.id !== recipeId)
      );

      await dispatch(removeRecipe(recipeId)).unwrap();
      await dispatch(fetchMyRecipes());
      toast.success("Recipe successfully removed!");
    } catch (err) {
      setLocalItems(items);
      toast.error("Failed to remove recipe: " + err);
    }
  };

  const handleFollow = async (userId) => {
    try {
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === userId ? { ...item, isFollowing: true } : item
        )
      );
      toast.success("Successfully followed user!");
    } catch (error) {
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === userId ? { ...item, isFollowing: false } : item
        )
      );
      toast.error("Failed to follow user: " + error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === userId ? { ...item, isFollowing: false } : item
        )
      );
      toast.success("Successfully unfollowed user!");
    } catch (error) {
      setLocalItems((prevItems) =>
        prevItems.map((item) =>
          item.id === userId ? { ...item, isFollowing: true } : item
        )
      );
      toast.error("Failed to unfollow user: " + error.message);
    }
  };

  const handleRemoveFromFollowingList = (userId) => {
    setLocalItems((prevItems) =>
      prevItems.filter((item) => item.id !== userId)
    );
  };

  if (!localItems.length) {
    return <div className={css.empty}>No items found</div>;
  }

  return (
    <div>
      <ul className={css.list}>
        {localItems.map((item) => (
          <li key={item.id} className={css.item}>
            {isRecipeList ? (
              <RecipePreview recipe={item} onDelete={handleDelete} />
            ) : isUserList ? (
              <UserCard
                userId={item.id}
                avatarUrl={item.avatar}
                name={item.name}
                recipesCount={Number(item.recipeCount)}
                recipesList={item.recipes}
                userPageUrl={`/user/${item.id}`}
                isFollowing={item.isFollowing}
                tabType={tabType}
                onFollow={handleFollow}
                onUnfollow={handleUnfollow}
                onRemoveFromFollowingList={handleRemoveFromFollowingList}
              />
            ) : (
              <div>Unsupported variant: {variant}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListItems.propTypes = {
  variant: PropTypes.oneOf(Object.keys(USER_LIST_ITEMS_VARIANTS)).isRequired,
  items: PropTypes.array.isRequired,
};

export default ListItems;
