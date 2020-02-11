import createDataContext from '@context/createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  isLoading: true,
  errorMessage: '',
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ERROR':
      return {
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

const signOut = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signOut },
  initialState,
);
