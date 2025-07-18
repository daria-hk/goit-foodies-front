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

const saved = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: saved?.user || null,
  token: saved?.token || null,
  followers: [],
  followees: [],
  isLoading: false,
  error: null,
  isSignInOpen: false,
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
      localStorage.removeItem("user");
    },
    clearUsersError: (state) => {
      state.error = null;
    },
    openSignInModal: (state) => {
      state.error = null;
      state.isSignInOpen = true;
    },
    closeSignInModal: (state) => {
      state.isSignInOpen = false;
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
        const { user, token } = action.payload;
        state.isLoading = false;
        state.user = user;
        state.token = token;
        localStorage.setItem("user", JSON.stringify({ user, token }));
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isLoading = false;
        state.user = user;
        state.token = token;
        localStorage.setItem("user", JSON.stringify({ user, token }));
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.followers = [];
        state.followees = [];
        localStorage.removeItem("user");
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

export const { resetUsersState, clearUsersError , openSignInModal, closeSignInModal} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectUser = (state) => state.users.user;
export const selectUserToken = (state) => state.users.token;
export const selectUserFollowers = (state) => state.users.followers;
export const selectUserFollowees = (state) => state.users.followees;
export const selectUsersIsLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
export const selectIsSignInOpen = (state) => state.users.isSignInOpen;
