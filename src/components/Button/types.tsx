import { ButtonProps } from 'react-native-elements';

export interface ClickableButton extends ButtonProps {
  round?: boolean;
  square?: boolean;
}

export interface CheckableButton extends ButtonProps {
  outline?: boolean;
}
