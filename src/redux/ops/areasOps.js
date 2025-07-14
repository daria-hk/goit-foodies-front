import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAreas = createAsyncThunk(
  "areas/fetchAll",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/areas`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
