import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUser, selectUserId, selectUserFollowees, selectUserFollowers, selectUserFollowersLoading, selectUserFollowersError, selectUserFolloweesLoading, selectUserFolloweesError } from "../../../redux/slices/usersSlice.js";
import UserCard from "../UserCard/UserCard.jsx";
import ItemsListContainer from "../ItemsListContainer/ItemsListContainer.jsx";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser, fetchUserFollowers, fetchUserFollowees } from "../../../redux/ops/usersOps.js";
import { useEffect } from "react";

export default function UsersList({ isFollowers = true }) {
    let items = useSelector(isFollowers ? selectUserFollowers : selectUserFollowees);
    const isLoading = useSelector(isFollowers ? selectUserFollowersLoading : selectUserFolloweesLoading);
    const error = useSelector(isFollowers ? selectUserFollowersError : selectUserFolloweesError);

    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (items.length > 0 || !userId) return;
        dispatch(isFollowers ? fetchUserFollowers(userId) : fetchUserFollowees(userId));
    }, [isFollowers, userId]);


    const handleFollow = async (userId) => {
        dispatch(followUser(userId));
    };

    const handleUnfollow = async (userId) => {
        dispatch(unfollowUser(userId));
    };

    const handleRemoveFromFollowingList = (userId) => {
        console.log(`Removed user ${userId} from following list UI`);
        // TODO: оновити локальний стан або store, якщо потрібно
    };

    // items = [
    //     {
    //         "id": 1,
    //         "name": "GoIT",
    //         "email": "goit@gmail.com",
    //         "avatar": "https://www.gravatar.com/avatar",
    //         "recipeCount": "0",
    //         "recipes": []
    //     },
    //     {
    //         "id": 2,
    //         "name": "Foodies user",
    //         "email": "user@gmail.com",
    //         "avatar": "https://www.gravatar.com/avatar",
    //         "recipeCount": "0",
    //         "recipes": []
    //     },
    //     {
    //         "id": 3,
    //         "name": "Larry Pageim",
    //         "email": "larry@gmail.com",
    //         "avatar": "https://www.gravatar.com/avatar",
    //         "recipeCount": "285",
    //         "recipes": [
    //             {
    //                 "id": 285,
    //                 "thumb": "https://ftp.goit.study/img/so-yummy/preview/Fennel%20Dauphinoise.jpg"
    //             },
    //             {
    //                 "id": 284,
    //                 "thumb": "https://ftp.goit.study/img/so-yummy/preview/Cevapi%20Sausages.jpg"
    //             },
    //             {
    //                 "id": 283,
    //                 "thumb": "https://ftp.goit.study/img/so-yummy/preview/Tunisian%20Orange%20Cake.jpg"
    //             },
    //             {
    //                 "id": 282,
    //                 "thumb": "https://ftp.goit.study/img/so-yummy/preview/Summer%20Pistou.jpg"
    //             }
    //         ]
    //     }
    // ]

    return <ItemsListContainer getItemIdByIndex={(index) => items[index].id}>
        {items.map((item) => <UserCard
            key={item.id}
            userId={`${item.id}`}
            avatarUrl={item.avatarUrl}
            name={item.name}
            recipesCount={item.recipesCount}
            recipesList={item.recipesList}
            userPageUrl={`/users/${item.id}`}
            isFollowing={item.isFollowing}
            tabType={isFollowers ? "followers" : "following"}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            onRemoveFromFollowingList={handleRemoveFromFollowingList}
        />)}
    </ItemsListContainer>;
}


UsersList.propTypes = {
    isFollowing: PropTypes.bool,
};