import { RouteProp, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface NavigationFlowProps<
  T extends ParamListBase,
  K extends keyof T = string
> {
  navigation: StackNavigationProp<T, K>;
  route: RouteProp<T, K>;
}

export type RootStackParamList = {
  TutorialFlow: undefined;
  LoginFlow: undefined;
  SignUpFlow: undefined;
  MainFlow: undefined;
};

export type TutorialStackParamList = {
  FirstTutorial: undefined;
  SecondTutorial: undefined;
  LastTutorial: undefined;
};

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  PasswordRestoration: undefined;
  PasswordCreation: undefined;
};

export type SignUpStackParamList = {
  EmailVerification: undefined;
  InterestSelection: undefined;
};
