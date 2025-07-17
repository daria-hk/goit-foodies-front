import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("categories");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
