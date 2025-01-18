import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./reducers/MovieReducer";
import TvReducer from "./reducers/TvReducer";
import PersonReducer from "./reducers/PersonReducer";

export const store = configureStore({
  reducer: {
    movie: MovieReducer,
    tv: TvReducer,
    person: PersonReducer,
  },
});
