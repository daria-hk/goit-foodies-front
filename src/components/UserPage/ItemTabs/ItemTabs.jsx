import TabsList from "../TabsList/TabsList";
import ListPagination from "../ListPagination/ListPagination";
import { useState } from "react";
import { USER_LIST_VARIANTS } from "../TabsList/TabsList";
import RecipesList from "../RecipesList/RecipesList.jsx";
import UsersList from "../UsersList/UsersList.jsx";

import css from './ItemTabs.module.css';


const RECIPE_VARIANTS = new Set([
    USER_LIST_VARIANTS.recipes,
    USER_LIST_VARIANTS.my_recipes,
    USER_LIST_VARIANTS.my_favorites,
]);

const ItemTabs = () => {
    const [tabType, setTabType] = useState(USER_LIST_VARIANTS.my_recipes);

    return (
        <>
            <TabsList variant={tabType} onChange={setTabType} />
            {
                RECIPE_VARIANTS.has(tabType) ?
                    <RecipesList isFavorite={tabType === USER_LIST_VARIANTS.my_favorites} /> :
                    <UsersList isFollowers={tabType === USER_LIST_VARIANTS.followers} />
            }
            <ListPagination variant={"all"} />
        </>
    );
};

ItemTabs.propTypes = {

};

export default ItemTabs;