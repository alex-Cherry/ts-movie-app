export enum CommonSettingsActionTypes {
  CHANGE_BG = 'CHANGE_BG'
};


// STATE
export type CommonSettingsState = {
  posterBg: string
};


// ACTIONS
interface ChangePosterBgAction {
  type: CommonSettingsActionTypes.CHANGE_BG,
  payload: { path: string }
};

export type CommonSettingsAction =
  | ChangePosterBgAction;
