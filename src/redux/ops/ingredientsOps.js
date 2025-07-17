import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("ingredients");
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
