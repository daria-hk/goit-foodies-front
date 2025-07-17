import PathInfo from "../../components/UserPage/PathInfo/PathInfo";
import MainTitle from "../../components/MainTitle/MainTitle";
import Subtitle from "../../components/Subtitle/Subtitle";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import ItemTabs from "../../components/UserPage/ItemTabs/ItemTabs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "../../redux/ops/usersOps";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const userId = useParams().id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMe());
    }, []);

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

            <ItemTabs userId={userId} />
        </div>
    );
};

export default UserPage;
