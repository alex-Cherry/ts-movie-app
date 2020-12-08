import { v4 as uuid } from 'uuid';
import { store } from '../';
import { ToastsActionTypes, Toast, Toasts, SetToastsAction, ToastType } from './types';

export const pushToast = (text: string, header: string = 'Notification', type: ToastType = 'info'): SetToastsAction => {

  const toast: Toast = {
    id: uuid(),
    text,
    headerText: header,
    type
  };

  const state = store.getState();
  // Copy state
  const copyToasts: Toasts = { ...state.toasts.toasts };
  // Add the new toast
  copyToasts[toast.id] = toast;
  return { type: ToastsActionTypes.SET_TOASTS, payload: { toasts: copyToasts } };

};

export const removeToast = (id: string): SetToastsAction => {

  const state = store.getState();
  // Copy state
  const copyToasts: Toasts = { ...state.toasts.toasts };
  // Remove the toast
  delete copyToasts[id];
  return { type: ToastsActionTypes.SET_TOASTS, payload: { toasts: copyToasts } };

};
