import React, { ReactNode, FC, Ref } from 'react';
import {
  TextStyle,
  ViewStyle,
  StyleProp,
  FlexAlignType,
  GestureResponderEvent,
  TouchableOpacityProps,
  TextProps as RNTextProps,
} from 'react-native';
import {
  Input,
  InputProps,
  CheckBoxProps as RNECheckBoxProps,
} from 'react-native-elements';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { FlexAxis } from '@type';

// NOTE: CheckableListItem
export interface CheckableListItemProps
  extends Omit<CheckboxProps, 'checked'>,
    HorizontalViewProps {
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
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  color?: string;
  text?: string;
  title?: boolean;
  subTitle?: boolean;
  smallText?: boolean;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export type TextType = FC<TextProps>;

// NOTE: TextField
export interface TextFieldProps extends InputProps {
  refId?: any;
  renderErrorMessage?: boolean;
  customRef?(node: Input, id?: any): void;
  inputRef?: Ref<Input>;
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
  children?: React.ReactNode;
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
export interface CheckboxProps extends Omit<RNECheckBoxProps, 'onPress'> {
  value?: string;
  large?: boolean;
  onPress?: (value: string, checked: boolean) => void;
}

export type CheckboxType = FC<CheckboxProps>;

// NOTE: HorizontalView
export interface HorizontalViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  horizontalAlign?: FlexAxis;
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
