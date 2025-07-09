import PathInfo from "./PathInfo/PathInfo";
import MainTitle from "../MainTitle/MainTitle";
import Subtitle from "../Subtitle/Subtitle";
import UserInfo from "./UserInfo/UserInfo";
import TabsList from "./TabsList/TabsList";
import ListItems from "./ListItems/ListItems";
import ListPagination from "./ListPagination/ListPagination";

const UserPage = () => {
  // Mock data
  const userData = {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/100",
    isCurrentUser: true,
    isFollowing: false,
  };

  const handleLogOut = () => {
    // TODO: Open Modal with LogOutModal
    alert("Log out clicked");
  };

  const handleFollowToggle = () => {
    // TODO: Send request to backend
    alert("Follow/Unfollow clicked");
  };

  return (
    <div>
      <PathInfo currentPageName="User Profile" />
      <MainTitle>User Profile</MainTitle>
      <Subtitle>Manage your account and recipes</Subtitle>

      <UserInfo data={userData} />

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
