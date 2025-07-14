import { createSlice } from "@reduxjs/toolkit";
import { fetchUserById } from "../ops/usersOps";

const initialState = {
  user: null,
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
      .addCase(fetchUserById.rejected, handleRejected);
  },
});

export const { resetUsersState } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state) => state.users.user;
export const selectUsersIsLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
