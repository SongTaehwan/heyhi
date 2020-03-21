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
  SettingsFlow: undefined;
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
  AccountCreation: undefined;
  EmailVerification: undefined;
  InterestSelection: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  ChangePassword: undefined;
  PaymentsMethods: undefined;
  Notification: undefined;
  History: undefined;
  Location: undefined;
};
