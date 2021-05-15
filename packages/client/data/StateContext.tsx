import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useReducer,
} from 'react';
import { ActionTypes, StateContextType } from '../utils/types';
import reducer, { initialValue } from './reducer';

// @ts-ignore
const StateContext = createContext();

export const StateContextProvider: FC = ({ children }) => {
  const value = useReducer(reducer, initialValue);
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () =>
  // @ts-ignore
  useContext<[StateContextType, Dispatch<ActionTypes>]>(StateContext);
