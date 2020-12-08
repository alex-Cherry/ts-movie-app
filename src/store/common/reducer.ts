import {
  CommonSettingsState,
  CommonSettingsAction,
  CommonSettingsActionTypes
} from './types';

const initialState: CommonSettingsState = { posterBg: '' };

const commonSettingsReducer = (
  state: CommonSettingsState = initialState, action: CommonSettingsAction
): CommonSettingsState => {

  switch (action.type) {

    case CommonSettingsActionTypes.CHANGE_BG:
      return { ...state, posterBg: action.payload.path };

    default:
      return state;
  }
}

export {
  commonSettingsReducer
};
