import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
// Axios
import axiosInstance from  '../../plugins/axios';
import { AxiosResponse } from 'axios';
// Types
import { MoviesActionTypes, Movies } from './types';
import { AppState } from '../store';

/**
 * FETCH MOVIES
 * 
 */
export const fetchMovies = (
): ThunkAction<Promise<void>, AppState, unknown, Action<any>> => async (dispatch, getState) => {

  dispatch(setMoviesLoading(true));

  try {
    
    const { movies: { currentPage, moviesPerPage, IDS } } = getState();

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const idsForFetch = IDS.slice(startIndex, endIndex);
    // Do the request
    const responses = await Promise.all(idsForFetch.map(id => axiosInstance.get(`/?i=${id}`)));
    // Get data from the response
    const data = getDataFromAxiosResponse(responses);

    dispatch({ type: MoviesActionTypes.FETCH_MOVIES, payload: { movies: data } })

  } catch (err) {
    throw new Error(err.message);

  } finally {
    dispatch(setMoviesLoading(false));

  }
}

/**
 * 
 * 
 * @param responses 
 */
const getDataFromAxiosResponse = (responses: AxiosResponse[]) => {
  
  return responses
    // Leave correct data
    .filter(response => response.status === 200 && response.data.Response !== 'False')
    // Convert the array to the object
    .reduce((acc: Movies, response: AxiosResponse) => {
      fillObjectWithFieldsFromResponse(acc, response.data);
      return acc;
    }, {});
}


/**
 * SEARCH MOVIES
 * 
 */
export const searchMovies = (
  text: string
): ThunkAction<Promise<void>, AppState, unknown, Action<any>> => async (dispatch) => {
  
  dispatch(setMoviesLoading(true));

  try {
    // Do the request
    const response = await axiosInstance.get(`/?s=${text}`);

    // Server error
    if (response.status !== 200) {
      throw new Error('Ошибка при запросе к серверу!');
    }
    // No movies found
    if (response.data.Response !== 'True') {
      throw new Error('Не найдено ни одного фильма!');
    }

    // Get data from the response
    const data = getDataFromAxiosSearchReponse(response);

    dispatch({ type: MoviesActionTypes.FETCH_MOVIES, payload: { movies: data } })

  } catch (err) {
    throw new Error(err.message);

  } finally {
    dispatch(setMoviesLoading(false));

  }
}

const getDataFromAxiosSearchReponse = (response: AxiosResponse) => {
  return response.data.Search.reduce((acc: Movies, item: any) => {
    fillObjectWithFieldsFromResponse(acc, item);
    return acc;
  }, {});
}

/**
 * 
 */
const fillObjectWithFieldsFromResponse = (obj: Movies, res: any) => {

  if (!res.imdbID) {
    return;
  }

  obj[res.imdbID] = {
    id: res.imdbID,
    title: res.Title,
    poster: res.Poster,
    year: res.Year,
    plot: res.Plot,
    runtime: res.Runtime,
    genre: res.Genre,
    production: res.Production,
    country: res.Country,
    director: res.Director,
    writer: res.Writer,
    actors: res.Actors,
    awards: res.Awards
  };
}


/**
 * SET CURRENT PAGE
 * 
 */
export const setCurrentPage = (
  page: number
): ThunkAction<Promise<void>, AppState, unknown, Action<any>> => async (dispatch) => {
  // Change the page number
  dispatch({ type: MoviesActionTypes.CHANGE_CURRENT_PAGE, payload: { page } });
  await dispatch(fetchMovies());
}


/**
 * DELETE MOVIE
 * 
 */
export const deleteMovie = (
  movieId: string
): ThunkAction<Promise<void>, AppState, unknown, Action<any>> => async (dispatch) => {
  // Remove id form IDS
  dispatch({ type: MoviesActionTypes.DELETE_MOVIE, payload: { movieId } });
  await dispatch(fetchMovies());
};


/**
 * SET MOVIES LOADING
 */
export const setMoviesLoading = (value: boolean) => {
  return { type: MoviesActionTypes.SET_MOVIES_LOADING, payload: { value } };
};
