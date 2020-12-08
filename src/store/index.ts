import { store, AppState } from './store';
// => ACTIONS
// Movies
import {
  fetchMovies,
  searchMovies,
  setCurrentPage,
  deleteMovie,
  setMoviesLoading
} from './movies/actions';
// Common
import {
  setPosterBg
} from './common/actions';
import {
  pushToast,
  removeToast
} from './toasts/actions';

// => TYPES
import {
  Movie
} from './movies/types';
import {
  ToastType
} from './toasts/types';


export {
  store,
  
  // Actions
  fetchMovies,
  searchMovies,
  setCurrentPage,
  deleteMovie,

  pushToast,
  removeToast,

  setPosterBg,
  setMoviesLoading
};

export type { 
  Movie,
  AppState,
  ToastType
};
