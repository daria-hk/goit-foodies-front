import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/testimonials`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
