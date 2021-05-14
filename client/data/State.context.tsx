import { createContext, useReducer, FC, useContext } from 'react';
import reducer, { initialValue } from './reducer';

const StateContext = createContext<any>(initialValue);

const StateProvider: FC = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialValue)}>
      {children}
    </StateContext.Provider>
  );
};

// export const useStateValue = useContext(StateContext);

export default StateProvider;
