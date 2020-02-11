import {
  CommonActions,
  NavigationContainerRef,
} from '@react-navigation/native';

let navigator: NavigationContainerRef;

export const setNavigator = (navigation: NavigationContainerRef) => {
  navigator = navigation;
};

export const navigate = (routeName: string, params = {}) => {
  navigator?.dispatch(CommonActions.navigate({ name: routeName, params }));
};
