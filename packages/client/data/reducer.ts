import { StateContextType, ActionTypes } from '../utils/types';

export const initialValue: StateContextType = {
  user: null,
  projects: [],
};

const reducer = (
  state = initialValue,
  action: ActionTypes
): StateContextType => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };

    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };

    default:
      return state;
  }
};

export default reducer;
