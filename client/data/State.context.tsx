import { createContext, useReducer, FC, useContext } from 'react';
import { StateContextType } from '../utils/types';
import reducer, { initialValue } from './reducer';

const StateContext = createContext<StateContextType>(initialValue);

const [state, dispatch] = useReducer(reducer, initialValue);
export const dispatchAction = dispatch;

const StateProvider: FC = ({ children }) => {
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const useStateValue = useContext(StateContext);

export default StateProvider;
