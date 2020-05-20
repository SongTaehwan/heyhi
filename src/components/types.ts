import React, { ReactNode, FC } from 'react';
import {
  TextProps as RNTextProps,
  TextStyle,
  ViewStyle,
  StyleProp,
  FlexAlignType,
  GestureResponderEvent,
} from 'react-native';
import {
  InputProps,
  CheckBoxProps as RNECheckBoxProps,
} from 'react-native-elements';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

// NOTE: CheckableListItem
export interface CheckableListItemProps extends CheckboxProps {
  checked?: boolean;
  title?: string;
  children?: ReactNode;
  showCheckbox?: boolean;
  onPressCheckbox?: (value: string, checked: boolean) => void;
  onPressTextButton?: (event: GestureResponderEvent) => void;
}

export interface CheckableListContentProps {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: TextProps;
  textButtonLabelText?: string;
  textButtonTitle?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export type CheckableListItemType = FC<CheckableListItemProps> & {
  ListItem: CheckableListContentType;
  Checkbox: CheckboxType;
};

export type CheckableListContentType = FC<CheckableListContentProps>;

// NOTE: Text
export interface TextProps extends RNTextProps {
  text?: string;
  title?: boolean;
  subTitle?: boolean;
  smallText?: boolean;
  style?: TextStyle;
  children?: React.ReactNode;
}

export type TextType = FC<TextProps>;

// NOTE: TextField
export interface TextFieldProps extends InputProps {
  hasError?: boolean;
}

export type TextFieldType = FC<TextFieldProps>;

// NOTE: ContentContainer
export interface ContentContainerProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export type ContentContainerType = FC<ContentContainerProps>;

// NOTE: Content
export interface ContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export type ContentType = FC<ContentProps>;

// NOTE: Container
export interface ContainerProps extends SafeAreaViewProps {
  topless?: boolean;
  bottomless?: boolean;
  style?: StyleProp<ViewStyle>;
}

export type ContainerType = FC<ContainerProps>;

// NOTE: Chip
export interface ChipProps {
  text: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
}

export type ChipType = FC<ChipProps>;

// NOTE: Checkbox
export interface CheckboxProps extends RNECheckBoxProps {
  value?: string;
  large?: boolean;
  onPress?: (value: string, checked: boolean) => void;
}

export type CheckboxType = FC<CheckboxProps>;

// NOTE: HorizontalView
export interface HorizontalViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  horizontalAlign?: FlexAlignType;
  verticalAlign?: FlexAlignType;
}

export type HorizontalViewType = FC<HorizontalViewProps>;

// NOTE: TextButton
export interface TextButtonProps extends TouchableOpacityProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export type TextButtonType = FC<TextButtonProps>;
