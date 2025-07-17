// import PropTypes from 'prop-types';
// import RecipePreview from "../../Recipes/components/RecipePreview/RecipePreview.jsx";
// import UserCard from "../UserCard/UserCard.jsx";
// import css from './ListItems.module.css';

// const ListItems = ({ isRecipes = true, items = [] }) => {
//     const handleDelete = (recipeId) => {
//         console.log(`Delete recipe with ID: ${recipeId}`);
//         // TODO: dispatch(deleteRecipe(recipeId)) або show confirm dialog
//     };

//     const handleFollow = async (userId) => {
//         console.log(`Follow user with ID: ${userId}`);
//         // TODO: dispatch(followUser(userId))
//     };

//     const handleUnfollow = async (userId) => {
//         console.log(`Unfollow user with ID: ${userId}`);
//         // TODO: dispatch(unfollowUser(userId))
//     };

//     const handleRemoveFromFollowingList = (userId) => {
//         console.log(`Removed user ${userId} from following list UI`);
//         // TODO: оновити локальний стан або store, якщо потрібно
//     };

//     // =======================================

//     if (!items.length) {
//         return <div className={css.empty}>No items found</div>;
//     }

//     return (
//         <div>
//             <ul>
//                 {items.map((item) => (
//                     <li key={item.id} className={css.item}>
//                         {isRecipes ? (
//                             <RecipePreview recipe={item} onDelete={handleDelete} />
//                         ) : <UserCard
//                             userId={item.id}
//                             avatarUrl={item.avatarUrl}
//                             name={item.name}
//                             recipesCount={item.recipesCount}
//                             recipesList={item.recipesList}
//                             userPageUrl={`/users/${item.id}`}
//                             isFollowing={item.isFollowing}
//                             tabType={variant}
//                             onFollow={handleFollow}
//                             onUnfollow={handleUnfollow}
//                             onRemoveFromFollowingList={handleRemoveFromFollowingList}
//                         />}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// ListItems.propTypes = {
//     isRecipes: PropTypes.bool,
//     items: PropTypes.array,
// };

// export default ListItems;
