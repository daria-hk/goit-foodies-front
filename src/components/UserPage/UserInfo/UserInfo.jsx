import { useRef } from "react";
import styles from "./UserInfo.module.css";
import defaultAvatar from "../../../assets/img/user/default-avatar.png";
import sprite from "../../../assets/img/sprite.svg";

export default function UserInfo({ user, isOwnProfile, onAvatarChange }) {
  const fileInputRef = useRef(null);
  if (!user) return null;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.avatarWrapper}>
          <img
            src={user.avatar || defaultAvatar}
            alt="User avatar"
            className={styles.avatar}
          />
          {isOwnProfile && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={handleClick}
                aria-label="Upload avatar"
              >
                <svg className={styles.plusIcon}>
                  <use href={`${sprite}#icon-plus`} />
                </svg>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className={styles.avatarInput}
                onChange={onAvatarChange}
              />
            </>
          )}
        </div>

        <h3 className={styles.userName}>{user.name || "User"}</h3>
      </div>

      <dl className={styles.info}>
        <dt>Email:</dt>
        <dd>{user.email}</dd>

        <dt>Added recipes:</dt>
        <dd>{user.recipesCount}</dd>

        <dt>Favorites:</dt>
        <dd>{user.favoritesCount}</dd>

        <dt>Followers:</dt>
        <dd>{user.followersCount}</dd>

        <dt>Following:</dt>
        <dd>{user.followingCount}</dd>
      </dl>

    </div>
  );
}
