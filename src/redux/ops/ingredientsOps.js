import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/ingredients`;
      const response = await axios.get(url);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
