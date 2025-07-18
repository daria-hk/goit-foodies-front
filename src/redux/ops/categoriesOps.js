import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("categories");
      return response.data.map((cat) => ({
        ...cat,
        lowerName: cat.name.toLowerCase(),
      }));
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
