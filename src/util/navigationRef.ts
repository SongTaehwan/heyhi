import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

let navigator: NavigationContainerRef;

export const setNavigator = (navigation: NavigationContainerRef): void => {
  navigator = navigation;
};

export const navigate = (routeName: string, params = {}): void => {
  navigator?.dispatch(CommonActions.navigate({ name: routeName, params }));
};
