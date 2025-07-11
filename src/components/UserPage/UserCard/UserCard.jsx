import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import styles from './UserCard.module.css'; // Розкоментуйте, якщо додасте стилі

const UserCard = ({
  userId,
  avatarUrl,
  name,
  recipesCount,
  recipesList,
  userPageUrl,
  isFollowing,
  tabType, // 'followers' або 'following'
  onFollow,
  onUnfollow,
  onRemoveFromFollowingList,
}) => {
  const [following, setFollowing] = useState(isFollowing);
  const [removed, setRemoved] = useState(false);

  if (tabType === "following" && removed) return null;

  const handleFollow = async () => {
    await onFollow(userId);
    setFollowing(true);
  };

  const handleUnfollow = async () => {
    await onUnfollow(userId);
    setFollowing(false);
    if (tabType === "following") {
      setRemoved(true);
      if (onRemoveFromFollowingList) onRemoveFromFollowingList(userId);
    }
  };

  return (
    <div /* className={styles.card} */>
      <Link to={userPageUrl} /* className={styles.avatarLink} */>
        <img src={avatarUrl} alt={name} /* className={styles.avatar} */ />
      </Link>
      <div /* className={styles.info} */>
        <Link to={userPageUrl} /* className={styles.nameLink} */>
          <h3 /* className={styles.name} */>{name}</h3>
        </Link>
        <p /* className={styles.recipesCount} */>Recipes: {recipesCount}</p>
        {/* Список рецептів для планшетів і десктопів */}
        <ul /* className={styles.recipesList} */>
          {recipesList &&
            recipesList.map((recipe) => (
              <li key={recipe.id}>{recipe.title}</li>
            ))}
        </ul>
        {/* Кнопка Follow/Following */}
        {tabType === "followers" &&
          (following ? (
            <button
              type="button"
              onClick={handleUnfollow} /* className={styles.followingBtn} */
            >
              Following
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFollow} /* className={styles.followBtn} */
            >
              Follow
            </button>
          ))}
        {tabType === "following" && following && (
          <button
            type="button"
            onClick={handleUnfollow} /* className={styles.followingBtn} */
          >
            Following
          </button>
        )}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recipesCount: PropTypes.number.isRequired,
  recipesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  userPageUrl: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool,
  tabType: PropTypes.oneOf(["followers", "following"]).isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  onRemoveFromFollowingList: PropTypes.func,
};

UserCard.defaultProps = {
  isFollowing: false,
  recipesList: [],
  onRemoveFromFollowingList: undefined,
};

export default UserCard;
