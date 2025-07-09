import PathInfo from "../../components/Recipes/components/PathInfo/PathInfo";
import RecipeInfo from "../../components/Recipes/components/RecipeInfo/RecipeInfo";
import PopularRecipes from "../../components/Recipes/components/PopularRecipes/PopularRecipes";

export default function RecipePage() {
  // Mock data for demonstration
  const recipeData = {
    image: "https://via.placeholder.com/300x200?text=Recipe",
    title: "Borscht",
    category: "Soups",
    description: "Traditional Ukrainian borscht with beetroot and meat.",
    author: { id: 1, name: "Olena" },
    ingredients: [
      {
        image: "https://via.placeholder.com/40",
        name: "Beetroot",
        amount: "2 pcs",
      },
      {
        image: "https://via.placeholder.com/40",
        name: "Potato",
        amount: "3 pcs",
      },
    ],
    preparation: { description: "Boil, mix, serve." },
  };
  const popularRecipes = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div>
      <PathInfo currentPageName={recipeData.title} />
      <RecipeInfo data={recipeData} />
      <PopularRecipes recipes={popularRecipes} />
    </div>
  );
}
