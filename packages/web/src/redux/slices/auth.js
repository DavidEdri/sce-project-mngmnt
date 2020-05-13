import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  user: {},
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (_, { payload }) => ({
      isLoggedin: Object.keys(payload).length !== 0,
      user: payload,
    }),
    addToFavorite: (state, { payload }) => {
      state.user.favorites.push(payload);
    },
    removeFromFavorite: (state, { payload }) => {
      state.user.favorites.filter((f) => f !== payload);
    },
  },
});

export const { setUser, addToFavorite, removeFromFavorite } = slice.actions;

export default slice;
