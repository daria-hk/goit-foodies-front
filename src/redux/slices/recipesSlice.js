import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "../ops/recipesOps";

const initialState = {
  items: [],
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, handleRejected);
  },
});

export const { resetRecipesState } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
export const selectRecipes = (state) => state.recipes.items;
export const selectRecipesIsLoading = (state) => state.recipes.isLoading;
export const selectRecipesError = (state) => state.recipes.error;
