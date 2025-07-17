import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("testimonials");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
