import { createSlice } from "@reduxjs/toolkit";
import { fetchUserRecipes } from "../ops/userRecipesOps";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPages: 1,
    limit: 8,
};


export const userRecipesSlice = createSlice({
    name: "userRecipes",
    initialState: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserRecipes.pending, (state, action) => {
                state[action.meta.arg.userId] = {
                    ...(state[action.meta.arg.userId] ?? initialState),
                    error: null,
                    isLoading: true,
                }
            })
            .addCase(fetchUserRecipes.fulfilled, (state, action) => {
                state[action.meta.arg.userId] = {
                    ...initialState,
                    isLoading: false,
                    items: action.payload.items || action.payload,
                    page: action.payload.page || 1,
                    totalPages: action.payload.pages || 1,
                }
            })
            .addCase(fetchUserRecipes.rejected, (state, action) => {
                state[action.meta.arg.userId] = {
                    ...initialState,
                    isLoading: false,
                    error: action.payload,
                }
            });
    },
});

export const userRecipesReducer = userRecipesSlice.reducer;

export const selectUserRecipes = (userId) => (state) => state.userRecipes[userId]?.items ?? [];
export const selectUserRecipesPage = (userId) => (state) => state.userRecipes[userId]?.page ?? 1;
export const selectUserRecipesTotalPages = (userId) => (state) => state.userRecipes[userId]?.totalPages ?? 1;
export const selectUserRecipesLimit = (userId) => (state) => state.userRecipes[userId]?.limit ?? 8;
export const selectUserRecipesError = (userId) => (state) => state.userRecipes[userId]?.error ?? null;
export const selectUserRecipesIsLoading = (userId) => (state) => state.userRecipes[userId]?.isLoading ?? false;
