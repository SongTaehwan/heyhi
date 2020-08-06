import {
  RouteProp,
  ParamListBase,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: CompositeNavigationProp<
    MaterialBottomTabNavigationProp<HomeRoutes, RouteName>,
    StackNavigationProp<AppRoutes, 'Home'>
  >;
  route: RouteProp<HomeRoutes, RouteName>;
}

export interface LoginNavigationProps<RouteName extends keyof LoginRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<LoginRoutes, RouteName>,
    StackNavigationProp<AppRoutes, 'LoginStack'>
  >;
  route: RouteProp<LoginRoutes, RouteName>;
}

export interface SignUpNavigationProps<RouteName extends keyof SignUpRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SignUpRoutes, RouteName>,
    StackNavigationProp<RootModalRoutes, 'App'>
  >;
  route: RouteProp<SignUpRoutes, RouteName>;
}

export interface OnboardingNavigationProps<
  RouteName extends keyof OnboardingRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<OnboardingRoutes, RouteName>,
    StackNavigationProp<AppRoutes, 'OnboardingStack'>
  >;
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

export type RootModalRoutes = {
  App: undefined;
  SelfieNotice: undefined;
};

export type AppRoutes = {
  Splash: undefined;
  LoginStack: {
    screen?: string;
  };
  SignUpStack: {
    screen?: string;
  };
  OnboardingStack: undefined;
  Home: {
    screen?: string;
  };
  ChatRoom: undefined;
  MyPageStack: {
    screen?: string;
  };
};

export type OnboardingRoutes = {
  FirstGuide: undefined;
  SecondGuide: undefined;
  LastGuide: undefined;
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
  EmailAuth: {
    email?: string;
    to?: keyof SignUpRoutes;
  };
  UploadBestShot: undefined;
  UploadSelfie: undefined;
  ServicePolicy: undefined;
  PolicyDetail: undefined;
  UserInterest: undefined;
  UserLanguage: undefined;
};

export type MyPageRoutes = {
  EditAlbum: undefined;
  ChangeEmail: undefined;
  ChangeLanguage: undefined;
  MyReview: undefined;
  ReviewDetail: {
    id: number;
  };
};

export type SettingRoutes = {
  ChangePassword: undefined;
  History: undefined;
  Location: undefined;
  NotificationControl: undefined;
  Payment: undefined;
  Setting: undefined;
};

export type HomeRoutes = {
  Map: undefined;
  Chat: undefined;
  MyPage: undefined;
};
