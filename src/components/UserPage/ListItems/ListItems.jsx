import PropTypes from 'prop-types';
import RecipePreview from "../../Recipes/components/RecipePreview/RecipePreview.jsx";
import UserCard from "../UserCard/UserCard.jsx";
import css from './ListItems.module.css';

const ListItems = ({ variant, items = [] }) => {
    const isRecipeList = ['My recipes', 'My favorites', 'Recipes'].includes(variant);
    const isUserList = ['Followers', 'Following'].includes(variant);

    const tabType = variant.toLowerCase(); // 'followers' or 'following'


    const handleDelete = (recipeId) => {
        console.log(`Delete recipe with ID: ${recipeId}`);
        // TODO: dispatch(deleteRecipe(recipeId)) або show confirm dialog
    };

    const handleFollow = async (userId) => {
        console.log(`Follow user with ID: ${userId}`);
        // TODO: dispatch(followUser(userId))
    };

    const handleUnfollow = async (userId) => {
        console.log(`Unfollow user with ID: ${userId}`);
        // TODO: dispatch(unfollowUser(userId))
    };

    const handleRemoveFromFollowingList = (userId) => {
        console.log(`Removed user ${userId} from following list UI`);
        // TODO: оновити локальний стан або store, якщо потрібно
    };

    // =======================================

    if (!items.length) {
        return <div className={css.empty}>No items found</div>;
    }

    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className={css.item}>
                        {isRecipeList ? (
                            <RecipePreview recipe={item} onDelete={handleDelete} />
                        ) : isUserList ? (
                            <UserCard
                                userId={item.id}
                                avatarUrl={item.avatarUrl}
                                name={item.name}
                                recipesCount={item.recipesCount}
                                recipesList={item.recipesList}
                                userPageUrl={`/users/${item.id}`}
                                isFollowing={item.isFollowing}
                                tabType={tabType}
                                onFollow={handleFollow}
                                onUnfollow={handleUnfollow}
                                onRemoveFromFollowingList={handleRemoveFromFollowingList}
                            />
                        ) : (
                            <div>Unsupported variant: {variant}</div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ListItems.propTypes = {
    variant: PropTypes.oneOf([
        'My recipes',
        'My favorites',
        'Recipes',
        'Followers',
        'Following',
    ]).isRequired,
    items: PropTypes.array.isRequired,
};

export default ListItems;
