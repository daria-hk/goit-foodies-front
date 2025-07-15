import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/recipes`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://test-xe0u.onrender.com/api/recipes/${id}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchRecipesPopular = createAsyncThunk(
  "recipes/fetchPopular",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://test-xe0u.onrender.com/api/recipes/popular`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipeData, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/recipes`;
      const formData = new FormData();
      formData.append("title", recipeData.title);
      formData.append("category", recipeData.category);
      formData.append("area", recipeData.area);
      formData.append("instructions", recipeData.instructions);
      formData.append("description", recipeData.description);
      formData.append("thumb", recipeData.thumb);
      formData.append("time", recipeData.time);
      formData.append("ingredients", JSON.stringify(recipeData.ingredients));
      const response = await axios.post(url, formData, {
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
      const url = `https://test-xe0u.onrender.com/api/recipes/my`;
      const response = await axios.get(url);
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
      const url = `https://test-xe0u.onrender.com/api/recipes/favorites`;
      const response = await axios.get(url);
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
      const url = `https://test-xe0u.onrender.com/api/recipes/${id}/favorite`;
      const response = await axios.post(url);
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
      const url = `https://test-xe0u.onrender.com/api/recipes/${id}/favorite`;
      const response = await axios.delete(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

