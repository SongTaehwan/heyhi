import { ButtonProps } from 'react-native-elements';

export interface ClickableButton extends ButtonProps {
  round?: boolean;
  square?: boolean;
}

export interface CheckableButton extends ButtonProps {
  outline?: boolean;
}

export interface IconButtonProps extends Omit<ButtonProps, 'icon'> {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  iconStyle?: object;
  icon?: React.ReactNode;
}
