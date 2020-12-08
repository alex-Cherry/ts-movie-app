export enum MoviesActionTypes {
  CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE',
  FETCH_MOVIES = 'FETCH_MOVIES',
  DELETE_MOVIE = 'DELETE_MOVIE',
  CHANGE_MODE = 'CHANGE_MODE',
  SET_MOVIES_LOADING = 'SET_MOVIES_LOADING'
};

export interface Movie {
  id: string,
  title: string,
  poster: string,
  year: string,
  plot: string,
  runtime: string,
  genre: string,
  production: string,
  country: string,
  director: string,
  writer: string,
  actors: string,
  awards: string
}
export interface Movies {
  [id: string]: Movie
}


// STATE
export type MoviesState = {
  IDS: string[],
  movies: Movies,
  moviesPerPage: number,
  currentPage: number,
  moviesLoading: boolean
};


// ACTIONS
interface ChangeCurrentPageAction {
  type: MoviesActionTypes.CHANGE_CURRENT_PAGE,
  payload: { page: number }
};
interface FetchMoviesAction {
  type: MoviesActionTypes.FETCH_MOVIES,
  payload: { movies: Movies }
};
interface DeleteMovieAction {
  type: MoviesActionTypes.DELETE_MOVIE,
  payload: { movieId: string }
};
interface MoviesLoadingAction {
  type: MoviesActionTypes.SET_MOVIES_LOADING,
  payload: { value: boolean }
};

export type MoviesActions =
  | ChangeCurrentPageAction
  | FetchMoviesAction
  | DeleteMovieAction
  | MoviesLoadingAction;
