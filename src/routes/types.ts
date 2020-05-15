import { RouteProp, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum AppFlow {
  Splash = 'Splash',
  TutorialFlow = 'TutorialFlow',
  LoginFlow = 'LoginFlow',
  MainFlow = 'MainFlow',
  SignUpFlow = 'SignUpFlow',
  MyPageFlow = 'MyPageFlow',
}

export enum Screens {
  // NOTE: Tutorial
  TutorialFirst = 'TutorialFirst',
  TutorialSecond = 'TutorialSecond',
  TutorialLast = 'TutorialLast',
  // NOTE: Login
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  PasswordRestoration = 'PasswordRestoration',
  PasswordCreation = 'PasswordCreation',
  // NOTE: Sign up
  AccountCreation = 'AccountCreation',
  BestShotUpload = 'BestShotUpload',
  SelfieUpload = 'SelfieUpload',
  ServicePolicy = 'ServicePolicy',
  ServicePolicyDetail = 'ServicePolicyDetail',
  EmailVerification = 'EmailVerification',
  InterestSelection = 'InterestSelection',
  // NOTE: MyPage
  MyPage = 'MyPage',
  LanguageSettings = 'LanguageSettings',
  MyReviews = 'MyReviews',
  MyReviewDetail = 'MyReviewDetail',
  EditAlbums = 'EditAlbums',
  EditEmail = 'EditEmail',
  // NOTE: MyPage & Setting
  Settings = 'Settings',
  ChangePassword = 'ChangePassword',
  PaymentsMethods = 'PaymentsMethods',
  Notification = 'Notification',
  History = 'History',
  Location = 'Location',
}

export interface NavigationFlowProps<
  T extends ParamListBase,
  K extends keyof T = string
> {
  navigation: StackNavigationProp<T, K>;
  route: RouteProp<T, K>;
}

export type TutorialFlowProps<
  T extends keyof TutorialStackParamList
> = NavigationFlowProps<TutorialStackParamList, T>;

export type LoginFlowProps<
  T extends keyof LoginStackParamList
> = NavigationFlowProps<LoginStackParamList, T>;

export type SignUpFlowProps<
  T extends keyof SignUpStackParamList
> = NavigationFlowProps<SignUpStackParamList, T>;

export type MyPageFlowProps<
  T extends keyof MyPageStackParamList
> = NavigationFlowProps<MyPageStackParamList, T>;

export type AppStackParamList = {
  Splash: undefined;
  TutorialFlow: undefined;
  LoginFlow: undefined;
  SignUpFlow: undefined;
  MainFlow: undefined;
  MyPageFlow: undefined;
  BottomTabFlow: undefined;
};

export type TutorialStackParamList = {
  TutorialFirst: undefined;
  TutorialSecond: undefined;
  TutorialLast: undefined;
};

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  PasswordRestoration: undefined;
  PasswordCreation: {
    checkEmail: string;
  };
};

export type SignUpStackParamList = {
  AccountCreation: undefined;
  BestShotUpload: undefined;
  SelfieUpload: undefined;
  ServicePolicy: undefined;
  ServicePolicyDetail: undefined;
  EmailVerification: {
    email?: string;
  };
  InterestSelection: undefined;
};

export type MyPageStackParamList = {
  MyPage: undefined;
  LanguageSettings: undefined;
  MyReviews: undefined;
  MyReviewDetail: { id: number };
  EditAlbums: undefined;
  EditEmail: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  PaymentsMethods: undefined;
  Notification: undefined;
  History: undefined;
  Location: undefined;
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
