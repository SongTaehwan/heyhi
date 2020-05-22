import React from 'react';
import Text from './Text';
import { Colors } from '@constants';
import { TextProps } from './types';

interface ErrorMessageProps extends TextProps {
  message?: string;
}

const ErrorMessage = ({
  message,
  align = 'center',
  ...rest
}: ErrorMessageProps): JSX.Element => {
  return (
    <Text
      color={Colors.red}
      text={message}
      align={align}
      {...rest}
      style={{ marginVertical: 10 }}
    />
  );
};

export default ErrorMessage;
