import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectUserRecipesLimit } from "@/redux/slices/userResipesSlice.js";
import api from "../../services/api";

export const fetchUserRecipes = createAsyncThunk(
    "recipes/fetchUserRecipes",
    async (
        { page = 1, userId },
        { rejectWithValue, getState }
    ) => {
        if (!userId) {
            return rejectWithValue(new Error("User ID is required"));
        }
        try {
            const state = getState();
            const limit = selectUserRecipesLimit(state); // використовуємо селектор з slices

            const queryParams = new URLSearchParams();

            queryParams.append("limit", limit);
            if (page) queryParams.append("page", page);
            queryParams.append("owner", userId);

            const response = await api.get(`recipes?${queryParams.toString()}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);