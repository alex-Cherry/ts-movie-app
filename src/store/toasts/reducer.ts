import { 
  ToastsActionTypes,
  ToastState,
  ToastsAction
} from './types';


// INITIAL STATE
const initialState: ToastState = {
  toasts: {}
};

// REDUCER
export const toastsReducer = (state: ToastState = initialState, action: ToastsAction) => {

  switch (action.type) {

    case ToastsActionTypes.SET_TOASTS:
      const toasts = { ...action.payload.toasts };
      return { ...state, toasts };

    default:
      return state;

  }
};
