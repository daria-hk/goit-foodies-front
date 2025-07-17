import MainTitle from "../../../MainTitle/MainTitle";
import Subtitle from "../../../Subtitle/Subtitle";
import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import RecipePagination from "../RecipePagination/RecipePagination";
import {useEffect, useState} from "react";

const Recipes = ({category, onBack}) => {
    // Mock data for ingredients and regions
    const [ingredients, setIngredients] = useState([]);
    const [regions, setRegions] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [page, setPage] = useState(1);
    // Mock data for recipes
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([1]);
    const totalPages = 3; // Mock value

    useEffect(() => {
        setIngredients([
            {id: 1, name: "Potato"},
            {id: 2, name: "Carrot"},
            {id: 3, name: "Chicken"},
        ]);
        setRegions([
            {id: 1, name: "Ukraine"},
            {id: 2, name: "Italy"},
            {id: 3, name: "France"},
        ]);
        setRecipes([
            {
                id: 1,
                title: "Borscht",
                description: "Traditional Ukrainian borscht with beetroot and meat.",
                image: "https://via.placeholder.com/250x120?text=Borscht",
                author: {
                    id: 1,
                    name: "Olena",
                    avatar: "https://via.placeholder.com/24?text=O",
                },
            },
            {
                id: 2,
                title: "Pasta Carbonara",
                description: "Classic Italian pasta with bacon and egg.",
                image: "https://via.placeholder.com/250x120?text=Carbonara",
                author: {
                    id: 2,
                    name: "Marco",
                    avatar: "https://via.placeholder.com/24?text=M",
                },
            },
        ]);
    }, []);

    const handleFiltersChange = ({ingredient, region}) => {
        setSelectedIngredient(ingredient);
        setSelectedRegion(region);
        setPage(1);
        // TODO: Request to backend with new filters
    };

    const handleAuthorClick = (author) => {
        // TODO: if not authorized — Modal, else navigate(`/user/${author.id}`)
        alert(`Go to author profile: ${author.name}`);
    };

    const handleFavoriteToggle = (recipe) => {
        // TODO: Request to backend, update favorites
        setFavorites((favs) =>
            favs.includes(recipe.id)
                ? favs.filter((id) => id !== recipe.id)
                : [...favs, recipe.id]
        );
    };

    const handleDetailsClick = (recipe) => {
        // TODO: navigate(`/recipe/${recipe.id}`)
        alert(`Go to recipe: ${recipe.title}`);
    };

    return (
        <section>
            <button type="button" onClick={onBack} style={{marginBottom: 16}}>
                ← Back
            </button>
            <MainTitle>Recipes: {category?.name}</MainTitle>
            <Subtitle>Select filters to search for recipes</Subtitle>
            <RecipeFilters
                ingredients={ingredients}
                regions={regions}
                selectedIngredient={selectedIngredient}
                selectedRegion={selectedRegion}
                onChange={handleFiltersChange}
            />
            <RecipeList
                recipes={recipes}
                favorites={favorites}
                onAuthorClick={handleAuthorClick}
                onFavoriteToggle={handleFavoriteToggle}
                onDetailsClick={handleDetailsClick}
            />
            <RecipePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </section>
    );
};

export default Recipes;
