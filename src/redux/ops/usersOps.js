import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`users/${id}`);
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
      const response = await api.post('users/register', userData);
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
      const response = await api.post('users/login', loginData);
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
      const response = await api.post('users/logout');
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
      const response = await api.get('users/me');
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
      const response = await api.patch('users/avatar', formData, {
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
      const response = await api.get(`users/${id}/followers`);
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
      const response = await api.get('users/followees');
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
      const response = await api.post(`users/followees/${id}`);
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
      const response = await api.delete(`users/followees/${id}`);
      return response.data;
    } catch (e) {
      const message = e.response?.data?.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
