import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/register`;
      const response = await axios.post(url, userData);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (loginData, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/login`;
      const response = await axios.post(url, loginData);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/logout`;
      const response = await axios.post(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchMe = createAsyncThunk(
  "users/fetchMe",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/me`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "users/updateAvatar",
  async (formData, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/avatar`;
      const response = await axios.patch(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async (id, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/${id}/followers`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUserFollowees = createAsyncThunk(
  "users/fetchFollowees",
  async (_, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/followees`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followUser = createAsyncThunk(
  "users/followUser",
  async (id, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/followees/${id}`;
      const response = await axios.post(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (id, thunkAPI) => {
    try {
      const url = `https://test-xe0u.onrender.com/api/users/followees/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
