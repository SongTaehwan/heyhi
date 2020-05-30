import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum AppFlow {
  Splash = 'Splash',
  TutorialStack = 'TutorialStack',
  LoginStack = 'LoginStack',
  MainTab = 'MainTab',
  SignUpStack = 'SignUpStack',
  MapStack = 'MapStack',
  ChatStack = 'ChatStack',
  MyPageStack = 'MyPageStack',
  MyPage = 'MyPage',
  Map = 'Map',
  Chat = 'Chat',
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
  NewPassword = 'NewPassword',
  EmailAuth = 'EmailAuth',
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
  // NOTE: App
  App = 'App',
  SelfieNotice = 'SelfieNotice',
  // NOTE: Map
  Map = 'Map',
  // NOTE: Chat
  ChatList = 'ChatList',
  ChatRoom = 'ChatRoom',
}

// NOTE: mapping navigation prop with stack navigator
export type ModalStackNavigationProps<
  T extends keyof ModalStackParamList
> = StackNavigationProp<ModalStackParamList, T>;

export type AppStackNavigationProps<
  T extends keyof AppStackParamList
> = StackNavigationProp<AppStackParamList, T>;

export type TutorialNavigationProps<
  T extends keyof TutorialStackParamList
> = StackNavigationProp<TutorialStackParamList, T>;

export type SignUpNavigationProps<
  T extends keyof SignUpStackParamList
> = StackNavigationProp<SignUpStackParamList, T>;

export type LoginNavigationProps<
  T extends keyof LoginStackParamList
> = StackNavigationProp<LoginStackParamList, T>;

export type MyPageNavigationProps<
  T extends keyof MyPageStackParamList
> = StackNavigationProp<MyPageStackParamList, T>;

// NOTE: mapping stack navigator with relative one
export type TutorialStackNavigationProps<
  T extends keyof TutorialStackParamList
> = CompositeNavigationProp<
  TutorialNavigationProps<T>,
  AppStackNavigationProps<AppFlow.TutorialStack>
>;

export type SignUpStackNavigationProps<
  T extends keyof SignUpStackParamList
> = CompositeNavigationProp<
  SignUpNavigationProps<T>,
  AppStackNavigationProps<AppFlow.SignUpStack> &
    ModalStackNavigationProps<'App'>
>;

export type LoginStackNavigationProps<
  T extends keyof LoginStackParamList
> = CompositeNavigationProp<
  LoginNavigationProps<T>,
  AppStackNavigationProps<AppFlow.LoginStack>
>;

export type ReuseablePageProps<
  T extends keyof AllParamList
> = StackNavigationProp<AllParamList, T>;

// NOTE: Param mapping
export type AllParamList = AppStackParamList &
  TutorialStackParamList &
  LoginStackParamList &
  SignUpStackParamList &
  MyPageStackParamList &
  SettingsStackParamList;

export type ModalStackParamList = {
  App: undefined;
  SelfieNotice: undefined;
};

export type MainTabParamList = {
  Map: undefined;
  Chat: undefined;
  MyPage: undefined;
};

export type AppStackParamList = {
  Splash: undefined;
  TutorialStack: undefined;
  LoginStack: {
    screen?: 'SignIn';
  };
  SignUpStack: undefined;
  MainTab: undefined;
  MyPageStack: undefined;
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
  EmailAuth: {
    email: string;
  };
  NewPassword: {
    userId: number;
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
    to?: Screens;
  };
  InterestSelection: undefined;
};

export type MyPageStackParamList = {
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

// NOTE: response type mapping
export type AuthenticationResponse = {
  accessToken: string;
  refreshToken: string;
};
