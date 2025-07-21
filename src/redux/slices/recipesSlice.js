import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchRecipeById,
  fetchRecipesPopular,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  fetchFavoriteRecipes,
  removeRecipe,
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
  popularRecipes: [],
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
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
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
      .addCase(fetchRecipesPopular.fulfilled, (state, action) => {
        state.popularRecipes = action.payload;
      })
      .addCase(addRecipeToFavorites.pending, (state) => {
        state.error = null;
      })

      .addCase(addRecipeToFavorites.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addRecipeToFavorites.rejected, handleRejected)
      .addCase(removeRecipeFromFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(removeRecipeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = state.favorites.filter(
          (recipe) => recipe.id !== action.meta.arg
        );
      })
      .addCase(removeRecipeFromFavorites.rejected, handleRejected)
      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload.items;
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
  clearFavorites,
} = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;

// Selectors
export const selectRecipes = (state) => state.recipes.items;
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
export const selectFavorites = (state) => state.recipes.favorites;
export const selectFavoritesTotalPages = (state) => 1;
export const selectFavoritesPage = (state) => state.recipes.page;
export const selectFavoritesIsLoading = (state) => false;
export const selectFavoritesError = (state) => null;

export const selectRecipesPage = (state) => state.recipes.page;
export const selectRecipesTotalPages = (state) => state.recipes.totalPages;
export const selectRecipesLimit = (state) => state.recipes.limit;
export const selectPopularRecipes = (state) => state.recipes.popularRecipes;
export const selectSelectedCategory = (state) => state.recipes.selectedCategory;
export const selectSelectedArea = (state) => state.recipes.selectedArea;
export const selectSelectedIngredients = (state) =>
  state.recipes.selectedIngredients;
