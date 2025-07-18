import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectRecipesLimit } from "@/redux/slices/recipesSlice.js";
import api from "../../services/api";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async (
    { page = 1, category = null, area = null, ingredients = [] },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const limit = selectRecipesLimit(state); // використовуємо селектор з slices

      const queryParams = new URLSearchParams();

      queryParams.append("limit", limit);
      if (page) queryParams.append("page", page);
      if (category && category !== "all")
        queryParams.append("category", category);
      if (area) queryParams.append("area", area);
      if (ingredients && ingredients.length > 0) {
        queryParams.append("ingredients", ingredients.join(","));
      }

      const response = await api.get(`recipes?${queryParams.toString()}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`recipes/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchRecipesPopular = createAsyncThunk(async (_, thunkAPI) => {
  try {
    const response = await api.get("recipes/popular");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipeData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", recipeData.title);
      formData.append("category", recipeData.category);
      formData.append("area", recipeData.area);
      formData.append("instructions", recipeData.instructions);
      formData.append("description", recipeData.description);
      formData.append("thumb", recipeData.thumb);
      formData.append("time", recipeData.time);
      formData.append("ingredients", JSON.stringify(recipeData.ingredients));
      const response = await api.post("recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchMyRecipes = createAsyncThunk(
  "recipes/fetchMyRecipes",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("recipes/my");
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  "recipes/fetchFavoriteRecipes",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("recipes/favorites");
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addRecipeToFavorites = createAsyncThunk(
  "recipes/addRecipeToFavorites",
  async (id, thunkAPI) => {
    try {
      const response = await api.post(`recipes/${id}/favorite`);
      await thunkAPI.dispatch(fetchFavoriteRecipes());
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeRecipeFromFavorites = createAsyncThunk(
  "recipes/removeRecipeFromFavorites",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`recipes/${id}/favorite`);
      await thunkAPI.dispatch(fetchFavoriteRecipes());
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
