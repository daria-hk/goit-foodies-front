import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  fetchFavoriteRecipes,
} from "../ops/recipesOps";

const initialState = {
  items: [],
  currentRecipe: null,
  favorites: { recipes: [] },
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    resetRecipesState: (state) => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
      state.currentRecipe = null;
      state.favorites.recipes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(fetchRecipeById.pending, handlePending)
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, handleRejected)

      .addCase(addRecipeToFavorites.fulfilled, (state, action) => {
        state.favorites.recipes.push(action.payload);
      })
      .addCase(removeRecipeFromFavorites.fulfilled, (state, action) => {
        // state.favorites.recipes.filter(
        //   (recipe) => recipe.id !== action.meta.arg
        state.favorites.recipes = state.favorites.recipes.filter(
          (recipe) => recipe.id !== action.meta.arg
        );
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        console.log("Look at this favorites list");
        state.favorites = action.payload;
      });
  },
});

export const { resetRecipesState } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
export const selectRecipes = (state) => state.recipes.items;
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavorites = (state) => state.recipes.favorites.recipes;
