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

function getBaseListState() {
  return {
    isLoading: false,
    error: null,
    items: [],
  };
}

const initialState = {
  user: saved?.user || null,
  token: saved?.token || null,
  followers: getBaseListState(),
  followees: getBaseListState(),
  isLoading: false,
  error: null,
  isSignInOpen: false,
  profileUser: null,
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
      state.followers = getBaseListState();
      state.followees = getBaseListState();
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
        state.profileUser = action.payload;
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
        state.followers = getBaseListState();
        state.followees = getBaseListState();
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

      .addCase(fetchUserFollowers.pending, (state, action) => handlePending(state.followers, action))
      .addCase(fetchUserFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
        state.followers.isLoading = false;
      })
      .addCase(fetchUserFollowers.rejected, (state, action) => handleRejected(state.followers, action))

      .addCase(fetchUserFollowees.pending, (state, action) => handlePending(state.followees, action))
      .addCase(fetchUserFollowees.fulfilled, (state, action) => {
        state.followees = action.payload;
        state.followees.isLoading = false;
      })
      .addCase(fetchUserFollowees.rejected, (state, action) => handleRejected(state.followees, action))

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

export const {
  resetUsersState,
  clearUsersError,
  openSignInModal,
  closeSignInModal,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUser = (state) => state.users.user;
export const selectProfileUser = (state) => state.users.profileUser;
export const selectUserToken = (state) => state.users.token;
export const selectUserFollowers = (state) => state.users?.followers?.items ?? [];
export const selectUserFollowersTotalPages = (state) => state.users?.followers?.totalPages ?? 1;
export const selectUserFollowersPage = (state) => state.users?.followees?.page ?? 1;
export const selectUserFollowersIsLoading = (state) => state.users?.followers?.isLoading ?? false;
export const selectUserFollowersError = (state) => state.users?.followers?.error ?? null;

export const selectUserFollowees = (state) => state.users?.followees?.items ?? [];
export const selectUserFolloweesTotalPages = (state) => state.users?.followees?.totalPages ?? 1;
export const selectUserFolloweesPage = (state) => state.users?.followees?.page ?? 1;
export const selectUserFolloweesIsLoading = (state) => state.users?.followees?.isLoading ?? false;
export const selectUserFolloweesError = (state) => state.users?.followees?.error ?? null;

export const selectUsersIsLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
export const selectIsSignInOpen = (state) => state.users.isSignInOpen;
