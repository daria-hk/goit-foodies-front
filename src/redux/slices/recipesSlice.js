import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "../ops/recipesOps";

const initialState = {
  items: [],
  page: 1,
  pages: 1,
  total: 0,
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
      state.page = 1;
      state.pages = 1;
      state.total = 0;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchRecipes.rejected, handleRejected);
  },
});

export const { resetRecipesState } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
export const selectRecipes = (state) => state.recipes.items;
export const selectRecipesPage = (state) => state.recipes.page;
export const selectRecipesPages = (state) => state.recipes.pages;
export const selectRecipesTotal = (state) => state.recipes.total;
export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
