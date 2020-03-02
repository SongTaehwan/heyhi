import React, {
  createContext,
  ReactElement,
  useReducer,
  Context,
  Dispatch,
} from 'react';

export type DataReducer = (
  prevState: DataState,
  action: DataActionType,
) => DataState;

export interface DataActionContainer<A> {
  [key: string]: DataActionFunc<A>;
}

export type DataActionFunc<A> = (d: Dispatch<A>) => () => Promise<unknown>;

export interface DataState {
  [key: string]: any;
}

export type DataActionType = {
  type: string;
  payload: any;
};

type DataContext = Context<DataState>;

type DataProvider = ({ children }: { children: ReactElement }) => JSX.Element;

type BoundDataAction = {
  [key: string]: (args?: unknown) => Promise<unknown>;
};

export interface DataContextGenerator<R, A, S> {
  (R: R, A: A, S: S): { Context: DataContext; Provider: DataProvider };
}

const createDataContext: <R, A, S extends DataState>(
  reducer: R,
  actions: A,
  state: S,
) => { Context: Context<S>; Provider: DataProvider } = (
  reducer,
  actions,
  initialState,
) => {
  const DataContext = createContext(initialState);

  const DataProvider: DataProvider = ({
    children,
  }: {
    children: ReactElement;
  }): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: BoundDataAction = {};

    for (const func in actions) {
      if (typeof actions[func] === 'function') {
        boundActions[func] = actions[func](dispatch);
      }
    }

    return (
      <DataContext.Provider value={{ ...state, ...boundActions }}>
        {children}
      </DataContext.Provider>
    );
  };

  return { Context: DataContext, Provider: DataProvider };
};

export default createDataContext;
