import { createReducer } from 'redux-act';

import {
  moviesError,
  moviesLoaded,
  moviesRequested,
  changeCurrentPage,
  changeMovie,
  changePagesCount,
  addToFavorites,
  removeMovie,
} from '../actions';

const initialState = {
  movies: [],
  loading: true,
  error: null,
  currentPage: 1,
  currentMovieId: 0,
  pagesCount: 0,
  favorites: [],
};

const reducer = createReducer(
  {
    [moviesRequested]: state => ({
      ...state,
      movies: [],
      loading: true,
      error: null,
    }),
    [moviesLoaded]: (state, payload) => ({
      ...state,
      movies: payload,
      loading: false,
      error: null,
    }),
    [moviesError]: (state, payload) => ({
      ...state,
      movies: [],
      loading: false,
      error: payload,
    }),
    [changeCurrentPage]: (state, payload) => ({
      ...state,
      currentPage: payload,
    }),
    [changeMovie]: (state, payload) => ({
      ...state,
      currentMovieId: payload,
    }),
    [changePagesCount]: (state, payload) => ({
      ...state,
      pagesCount: payload,
    }),
    [addToFavorites]: (state, payload) => ({
      ...state,
      favorites: [...state.favorites, payload],
    }),
    [removeMovie]: (state, payload) => {
      const movieIndex = state.favorites.findIndex(movie => movie.id === payload);
      return {
        ...state,
        favorites: [...state.favorites.slice(0, movieIndex),
          ...state.favorites.slice(movieIndex + 1)],
      };
    },
  },
  initialState,
);

export default reducer;
