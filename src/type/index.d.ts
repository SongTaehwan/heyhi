import { StackNavigationProp } from '@react-navigation/stack';

export interface NavigationProp<Params, RouteName> {
  navigation: StackNavigationProp<Params, RouteName>;
}
