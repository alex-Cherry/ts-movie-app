export enum ToastsActionTypes {
  SET_TOASTS = 'SET_TOASTS'
};

// TYPES
export type ToastType = 
  | 'success'
  | 'danger'
  | 'info';
export type Toast = {
  id: string,
  text: string,
  headerText?: string,
  type?: ToastType
};
export type Toasts = {
  [id: string]: Toast
};


// STATE
export type ToastState = {
  toasts: Toasts
};


// ACTIONS
export type SetToastsAction = {
  type: ToastsActionTypes.SET_TOASTS,
  payload: { toasts: Toasts }
};

export type ToastsAction = 
  | SetToastsAction;
