import {
  Route,
  PartialState,
  CommonActions,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';

let navigator: NavigationContainerRef;

export const setNavigator = (navigation: NavigationContainerRef): void => {
  navigator = navigation;
};

export const navigate = (routeName: string, params = {}): void => {
  navigator?.dispatch(CommonActions.navigate({ name: routeName, params }));
};

type CurrentNavState = Route<string> & {
  state?: NavigationState | PartialState<NavigationState>;
};

export const isFirstScene = ({ state }: CurrentNavState): boolean => {
  const isInitialRender = !state;

  if (isInitialRender) {
    return true;
  }

  if (state) {
    const { index } = state;
    return index === 0;
  }

  return false;
};
