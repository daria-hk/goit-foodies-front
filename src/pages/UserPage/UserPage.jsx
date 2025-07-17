import PathInfo from "../../components/UserPage/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import TabsList from "../../components/UserPage/TabsList/TabsList";
import ListItems from "../../components/UserPage/ListItems/ListItems";
import ListPagination from "../../components/UserPage/ListPagination/ListPagination";
import {useSelector} from "react-redux";
import {selectRecipes, selectRecipesTotalPages} from "@/redux/slices/recipesSlice.js";

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

  const handleLogOut = () => {
      // TODO: Open Modal with LogOutModal
      alert("Log out clicked");
  };

  const handleFollowToggle = () => {
      // TODO: Send request to backend
      alert("Follow/Unfollow clicked");
  };

  const recipes = useSelector(selectRecipes); // Отримуємо список рецептів з Redux

  console.log('[UserPage] recipes:', recipes, Array.isArray(recipes));

  const totalPages = useSelector(selectRecipesTotalPages);
  console.log('TOTAL PAGES IN PAGE:', totalPages);

  return (
      <div>
          <PathInfo currentPageName="User Profile"/>
          <MainTitle>User Profile</MainTitle>
          <Subtitle>Manage your account and recipes</Subtitle>

          <UserInfo
            user={userData}
            isOwnProfile={userData.isCurrentUser}
            onAvatarChange={handleAvatarChange}
          />

          {userData.isCurrentUser ? (
              <button type="button" onClick={handleLogOut}>
                  Log Out
              </button>
          ) : (
              <button type="button" onClick={handleFollowToggle}>
                  {userData.isFollowing ? "Following" : "Follow"}
              </button>
          )}

          <TabsList/>
          <ListItems variant={'Recipes'} items={recipes}/>
          <ListPagination variant={"all"}/>
      </div>
  );
};

export default UserPage;
