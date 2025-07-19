import PathInfo from "../../components/Common/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import TabsList from "../../components/UserPage/TabsList/TabsList";
import ListItems from "../../components/UserPage/ListItems/ListItems";
import ListPagination from "../../components/UserPage/ListPagination/ListPagination";
import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectRecipesTotalPages,
} from "@/redux/slices/recipesSlice.js";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const userData = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    isCurrentUser: true,
    isFollowing: false,
    recipesCount: 5,
    favoritesCount: 12,
    followersCount: 20,
    followingCount: 10,
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // TODO: реалізувати завантаження на сервер
      console.log("Avatar selected:", file);
    }
  };

  const handleLogOut = () => {
    // TODO: Open Modal with LogOutModal
    alert("Log out clicked");
  };

  const handleFollowToggle = () => {
    // TODO: Send request to backend
    alert("Follow/Unfollow clicked");
  };

  const recipes = useSelector(selectRecipes); // Отримуємо список рецептів з Redux
  const totalPages = useSelector(selectRecipesTotalPages);

  return (
    <div className={styles.container}>
      <PathInfo currentPageName="User Profile" />
      <div>
        {" "}
        <MainTitle className={styles.title}>Profile</MainTitle>
        <Subtitle className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
      </div>
      <div className={styles.containerMainArea}>
        <div className={styles.userInfoWrapper}>
          <UserInfo
            user={userData}
            isOwnProfile={userData.isCurrentUser}
            onAvatarChange={handleAvatarChange}
          />

          {userData.isCurrentUser ? (
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
              {userData.isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>

        <div>
          <TabsList />{" "}
          <ListItems variant={"Recipes"} items={recipes} />
          <ListPagination variant={"all"} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
