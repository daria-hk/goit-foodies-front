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
    // Mock data
    const userData = {
        id: 1,
        name: "John Doe",
        avatar: "https://via.placeholder.com/100",
        isCurrentUser: true,
        isFollowing: false,
    };

    const recipes = useSelector(selectRecipes); // Отримуємо список рецептів з Redux

    console.log('[UserPage] recipes:', recipes, Array.isArray(recipes));

    const handleLogOut = () => {
        // TODO: Open Modal with LogOutModal
        alert("Log out clicked");
    };

    const handleFollowToggle = () => {
        // TODO: Send request to backend
        alert("Follow/Unfollow clicked");
    };

    const totalPages = useSelector(selectRecipesTotalPages);
    console.log('TOTAL PAGES IN PAGE:', totalPages);

    return (
        <div>
            <PathInfo currentPageName="User Profile"/>
            <MainTitle>User Profile</MainTitle>
            <Subtitle>Manage your account and recipes</Subtitle>

            <UserInfo data={userData}/>

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
