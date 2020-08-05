import {
  RouteProp,
  CompositeNavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export interface LoginNavigationProps<RouteName extends keyof LoginRoutes> {
  navigation: StackNavigationProp<LoginRoutes, RouteName>;
  route: RouteProp<LoginRoutes, RouteName>;
}

export interface SignUpNavigationProps<RouteName extends keyof SignUpRoutes> {
  navigation: StackNavigationProp<SignUpRoutes, RouteName>;
  route: RouteProp<SignUpRoutes, RouteName>;
}

export interface OnboardingNavigationProps<
  RouteName extends keyof OnboardingRoutes
> {
  navigation: StackNavigationProp<OnboardingRoutes, RouteName>;
  route: RouteProp<OnboardingRoutes, RouteName>;
}

export interface MyPageNavigationProps<RouteName extends keyof MyPageRoutes> {
  navigation: StackNavigationProp<MyPageRoutes, RouteName>;
  route: RouteProp<MyPageRoutes, RouteName>;
}

export interface SettingNavigationProps<RouteName extends keyof SettingRoutes> {
  navigation: StackNavigationProp<SettingRoutes, RouteName>;
  route: RouteProp<SettingRoutes, RouteName>;
}

// TODO: Home tab props

export type RootModalRoutes = {
  App: undefined;
  SelfieNotice: undefined;
};

export type AppRoutes = {
  Splash: undefined;
  LoginStack: undefined;
  SignUpStack: undefined;
  TutorialStack: undefined;
  Home: undefined;
  ChatRoom: undefined;
  MyPageStack: undefined;
};

export type LoginRoutes = {
  Login: undefined;
  PasswordChange: {
    userId: number;
  };
  EmailAuth: {
    email?: string;
  };
  ForgotPassword: undefined;
};

export type SignUpRoutes = {
  SignUp: undefined;
  EmailAuth: undefined;
  UploadBestShot: undefined;
  UploadSelfie: undefined;
  ServicePolicy: undefined;
  PolicyDetail: undefined;
  UserInterest: undefined;
  UserLanguage: undefined;
};

export type OnboardingRoutes = {};

export type MyPageRoutes = {};

export type SettingRoutes = {};

export type HomeRoutes = {};
