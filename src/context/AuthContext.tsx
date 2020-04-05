import AsyncStorage from '@react-native-community/async-storage';
import { Dispatch } from 'react';
import createDataContext from '@context/createDataContext';

interface AuthContextState {
  isLoading: boolean;
  errorMessage: string;
}

interface AuthAction {
  type: AuthActionType;
  payload: boolean | string;
}

enum AuthActionType {
  error = 'error',
}

interface AuthReducer {
  (prevState: AuthContextState, action: AuthAction): AuthContextState;
}

interface AuthActionContainer<A> {
  signOut(dispatch: Dispatch<A>): () => Promise<void>;
}

const initialState: AuthContextState = {
  isLoading: true,
  errorMessage: '',
};

const authReducer: AuthReducer = (
  state = initialState,
  { type, payload }: AuthAction,
): AuthContextState => {
  switch (type) {
    case AuthActionType.error:
      return {
        isLoading: false,
        errorMessage: payload as string,
      };
    default:
      return state;
  }
};

const signOut = (dispatch: Dispatch<AuthAction>) => async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    dispatch({ type: AuthActionType.error, payload: error.message });
  }
};

const AuthDataContext = createDataContext<
  AuthReducer,
  AuthActionContainer<AuthAction>,
  AuthContextState
>(authReducer, { signOut }, initialState);

export const { Context, Provider } = AuthDataContext;
