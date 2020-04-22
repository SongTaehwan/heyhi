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
  MyPageFlow: undefined;
  SettingsFlow: undefined;
  BottomTabFlow: undefined;
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
  PasswordCreation: passwordCreation;
};

type passwordCreation = {
  checkEmail: string;
};

export type SignUpStackParamList = {
  AccountCreation: undefined;
  BestShotUpload: undefined;
  SelfieUpload: undefined;
  ServicePolicy: undefined;
  ServicePolicyDetail: undefined;
  EmailVerification: emailVerification;
  InterestSelection: undefined;
};

type emailVerification = {
  email?: string;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  LanguageSettings: undefined;
  MyReviews: undefined;
  MyReviewDetail: { reviewId: number };
  EditAlbums: undefined;
  EditEmail: undefined;
  Settings: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  ChangePassword: undefined;
  PaymentsMethods: undefined;
  Notification: undefined;
  History: undefined;
  Location: undefined;
};

export type AuthenticationResponse = {
  accessToken: string;
  refreshToken: string;
};
