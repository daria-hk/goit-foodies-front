import styles from "./UserInfo.module.css";
import defaultAvatar from "../../../assets/img/user/default-avatar.png";

export default function UserInfo({ user, isOwnProfile, onAvatarChange }) {
  if (!user) return null; 

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <img
          src={user.avatar || defaultAvatar}
          alt="User avatar"
          className={styles.avatar}
        />
        {isOwnProfile && (
          <input
            type="file"
            className={styles.avatarInput}
            onChange={onAvatarChange}
          />
        )}
      </div>

      <div className={styles.info}>
        <p>Email: {user.email}</p>
        <p>Recipes: {user.recipeCount}</p>
        <p>Favorites: {user.favoritesCount}</p>
        <p>Followers: {user.followersCount}</p>
        <p>Following: {user.followingCount}</p>
      </div>
    </div>
  );
}
