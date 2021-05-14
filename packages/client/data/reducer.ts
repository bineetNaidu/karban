import { ActionTypes, StateContextType } from '../utils/types';

export const initialValue: StateContextType = {
  user: null,
  projects: [],
};

const reducer = (
  state: StateContextType,
  action: ActionTypes
): StateContextType => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };

    case 'LOGOUT':
      return {
        user: null,
        projects: [],
      };

    default:
      return state;
  }
};

export default reducer;
