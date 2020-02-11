import React, { createContext, ReactElement, useReducer } from 'react';

type Actions = { [key: string]: (args?: any) => any };

export default (
  reducer,
  actions: Actions,
  initialState: { [key: string]: any },
) => {
  const Context = createContext(initialState);

  const Provider = ({ children }: { children: ReactElement }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: Actions = {};

    for (let func in actions) {
      boundActions[func] = actions[func](dispatch);
    }

    return (
      <Context.Provider value={{ ...state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
