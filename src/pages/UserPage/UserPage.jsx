import PathInfo from "../../components/UserPage/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import TabsList from "../../components/UserPage/TabsList/TabsList";
import ListItems from "../../components/UserPage/ListItems/ListItems";
import ListPagination from "../../components/UserPage/ListPagination/ListPagination";

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
    alert("Log out clicked");
  };

  const handleFollowToggle = () => {
    alert("Follow/Unfollow clicked");
  };

  const handleAvatarChange = (file) => {
    alert("Avatar selected: " + file.name);
    // Send file to server
  };

  return (
    <div>
      <PathInfo currentPageName="User Profile" />
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

      <TabsList />
      <ListItems />
      <ListPagination />
    </div>
  );
};

export default UserPage;
