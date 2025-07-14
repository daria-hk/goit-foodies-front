import { configureStore } from "@reduxjs/toolkit";
//import { authReducer } from "./slices/authSlice";
import { usersReducer } from "./slices/usersSlice";
import { recipesReducer } from "./slices/recipesSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { areasReducer } from "./slices/areasSlice";
import { ingredientsReducer } from "./slices/ingredientsSlice";
import { testimonialsReducer } from "./slices/testimonialsSlice";
//import { followersReducer } from "./slices/followersSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    categories: categoriesReducer,
    areas: areasReducer,
    ingredients: ingredientsReducer,
    testimonials: testimonialsReducer,
    user: usersReducer,
  },
});

/**
 * export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
    areas: areasReducer,
    ingredients: ingredientsReducer,
    testimonials: testimonialsReducer,
    followers: followersReducer,
  },
});
 */
