import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import { moviesReducer } from './movies/reducer';
import { commonSettingsReducer } from './common/reducer';
import { toastsReducer } from './toasts/reducer';

// Create the root reducer
const rootReducer = combineReducers({
  movies: moviesReducer,
  common: commonSettingsReducer,
  toasts: toastsReducer
});
// Create the store
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export type AppState = ReturnType<typeof rootReducer>;
