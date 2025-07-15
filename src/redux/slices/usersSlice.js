import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserById,
  registerUser,
  loginUser,
  logoutUser,
  fetchMe,
  updateUserAvatar,
  fetchUserFollowers,
  fetchUserFollowees,
  followUser,
  unfollowUser,
} from "../ops/usersOps";

const initialState = {
  user: null,
  token: null,
  followers: [],
  followees: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsersState: (state) => {
      state.user = null;
      state.token = null;
      state.followers = [];
      state.followees = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.followers = [];
        state.followees = [];
      })
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(fetchMe.pending, handlePending)
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, handleRejected)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.avatar = action.payload.avatar;
        }
      })
      .addCase(updateUserAvatar.rejected, handleRejected)
      .addCase(fetchUserFollowers.pending, handlePending)
      .addCase(fetchUserFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followers = action.payload;
      })
      .addCase(fetchUserFollowers.rejected, handleRejected)
      .addCase(fetchUserFollowees.pending, handlePending)
      .addCase(fetchUserFollowees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followees = action.payload;
      })
      .addCase(fetchUserFollowees.rejected, handleRejected)
      .addCase(followUser.pending, handlePending)
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followees = action.payload;
      })
      .addCase(followUser.rejected, handleRejected)
      .addCase(unfollowUser.pending, handlePending)
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followees = action.payload;
      })
      .addCase(unfollowUser.rejected, handleRejected);
  },
});

export const { resetUsersState } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state) => state.users.user;
export const selectUserToken = (state) => state.users.token;
export const selectUserFollowers = (state) => state.users.followers;
export const selectUserFollowees = (state) => state.users.followees;
export const selectUsersIsLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
