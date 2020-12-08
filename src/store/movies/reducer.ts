import {
  MoviesState,
  MoviesActions,
  MoviesActionTypes
} from './types';
import IDS from './mock';

// INITIAL STATE
const initialState: MoviesState = {
  IDS,
  currentPage: 1,
  moviesPerPage: 12,
  movies: {},
  moviesLoading: false
};

// REDUCER
const moviesReducer = (state: MoviesState = initialState, action: MoviesActions) => {
  switch (action.type) {
    case MoviesActionTypes.CHANGE_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.page };

    case MoviesActionTypes.FETCH_MOVIES:
      return { ...state, movies: action.payload.movies };

    case MoviesActionTypes.DELETE_MOVIE:
      return { ...state, IDS: state.IDS.filter(id => id !== action.payload.movieId) };

    case MoviesActionTypes.SET_MOVIES_LOADING:
      return { ...state, moviesLoading: action.payload.value }

    default:
      return state;
  }
}

export {
  moviesReducer
};
