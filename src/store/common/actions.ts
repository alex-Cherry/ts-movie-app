import { CommonSettingsActionTypes } from './types';

export const setPosterBg = (path: string) => {
  return { type: CommonSettingsActionTypes.CHANGE_BG, payload: { path } };
};
