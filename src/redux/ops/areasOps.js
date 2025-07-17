import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchAreas = createAsyncThunk(
  "areas/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("areas");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
