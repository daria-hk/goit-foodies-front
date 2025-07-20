import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PathInfo from "../../components/Common/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import TabsList from "../../components/UserPage/TabsList/TabsList";
import ListItems from "../../components/UserPage/ListItems/ListItems";
import ListPagination from "../../components/UserPage/ListPagination/ListPagination";

import {
  selectRecipes,
  selectRecipesTotalPages,
} from "@/redux/slices/recipesSlice.js";

import {
  selectUser,
  selectProfileUser,
} from "../../redux/slices/usersSlice";
import { fetchUserById } from "../../redux/ops/usersOps";

import styles from "./UserPage.module.css";

const UserPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentUser = useSelector(selectUser);
  const profileUser = useSelector(selectProfileUser);
  const recipes = useSelector(selectRecipes);
  const totalPages = useSelector(selectRecipesTotalPages);

  const isOwnProfile = currentUser && String(currentUser.id) === id;
  const user = isOwnProfile ? currentUser : profileUser;

  useEffect(() => {
    if (!isOwnProfile && id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, isOwnProfile]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Avatar selected:", file);
      // TODO: реалізувати завантаження на сервер
    }
  };

  const handleLogOut = () => {
    alert("Log out clicked");
    // TODO: Open Modal with LogOutModal
  };

  const handleFollowToggle = () => {
    alert("Follow/Unfollow clicked");
    // TODO: Send request to backend
  };

  return (
    <div className={styles.container}>
      <PathInfo currentPageName="User Profile" />
      <div>
        <MainTitle className={styles.title}>Profile</MainTitle>
        <Subtitle className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
      </div>
      <div className={styles.containerMainArea}>
        <div className={styles.userInfoWrapper}>
          <UserInfo
            user={{ ...user, isCurrentUser: isOwnProfile }}
            isOwnProfile={isOwnProfile}
            onAvatarChange={handleAvatarChange}
          />

          {isOwnProfile ? (
            <button
              type="button"
              onClick={handleLogOut}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Log Out
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFollowToggle}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {user?.isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>

        <div>
          <TabsList />
          <ListItems variant={"Recipes"} items={recipes} />
          <ListPagination variant={"all"} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
