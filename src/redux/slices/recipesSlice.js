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
  favorites: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  limit: 8,
  selectedCategory: null,
  selectedArea: null,
  selectedIngredients: [],
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
      state.page = 1;
      state.pages = 1;
      state.total = 0;
      state.isLoading = false;
      state.error = null;
      state.currentRecipe = null;
      state.favorites = [];
      state.page = 1;
      state.totalPages = 1;
      state.limit = 8;
      state.selectedCategory = null;
      state.selectedArea = null;
      state.selectedIngredients = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedArea: (state, action) => {
      state.selectedArea = action.payload;
    },
    setSelectedIngredients: (state, action) => {
      state.selectedIngredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        console.log();
        state.isLoading = false;
        state.items = action.payload.items || action.payload;
        state.page = action.payload.page || 1;
        state.totalPages = action.payload.pages || 1;
        // state.currentRecipe = action.payload; state.сurrenRecipe - зберігає дані одного рецепту з fetchRecipeById
      })
      .addCase(fetchRecipes.rejected, handleRejected)

      .addCase(fetchRecipeById.pending, handlePending)
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, handleRejected)

      .addCase(addRecipeToFavorites.pending, handlePending)

      .addCase(addRecipeToFavorites.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addRecipeToFavorites.rejected, handleRejected)
      .addCase(removeRecipeFromFavorites.pending, handlePending)
      .addCase(removeRecipeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (recipe) => recipe.id !== action.payload
        );
      })
      .addCase(removeRecipeFromFavorites.rejected, handleRejected)
      .addCase(fetchFavoriteRecipes.pending, handlePending)
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, handleRejected);
  },
});

export const {
  resetRecipesState,
  setPage,
  setLimit,
  setSelectedCategory,
  setSelectedArea,
  setSelectedIngredients,
} = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;

// Selectors
export const selectRecipes = (state) => state.recipes.items;
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavorites = (state) => state.recipes.favorites;
export const selectRecipesPage = (state) => state.recipes.page;
export const selectRecipesTotalPages = (state) => state.recipes.totalPages;
export const selectRecipesLimit = (state) => state.recipes.limit;

export const selectSelectedCategory = (state) => state.recipes.selectedCategory;
export const selectSelectedArea = (state) => state.recipes.selectedArea;
export const selectSelectedIngredients = (state) =>
  state.recipes.selectedIngredients;
