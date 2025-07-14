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
  "recipes/fetchById",
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

///recipes/popular

//https://test-xe0u.onrender.com/api/categories
