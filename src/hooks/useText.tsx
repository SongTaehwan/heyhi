import validator from 'validator';
import _debounce from 'lodash/debounce';
import React, { useState } from 'react';

interface TextHookOption {
  isEmail?: boolean;
  isJWT?: boolean;
  isMobilePhone?: boolean;
  delayTime?: number;
}

const defaultOption: TextHookOption = {
  isEmail: false,
  isJWT: false,
  isMobilePhone: false,
  delayTime: 300,
};

// NOTE: Only check if correct form of Email
const useText = (
  initialState = '',
  options: TextHookOption = defaultOption,
): [string, (text: string) => void, boolean] => {
  const { isEmail = false, isMobilePhone = false, delayTime = 300 } = options;
  const [text, setText] = useState<string>(initialState);
  const [isValid, setValidation] = useState(false);

  const handleTextChange = (textInput: string): void => {
    if (isEmail && validator.isEmail(textInput)) {
      setValidation(true);
      return setText(textInput);
    }

    if (isMobilePhone && validator.isMobilePhone(textInput, 'ko-KR')) {
      setValidation(true);
      return setText(textInput);
    }

    if (isValid) {
      setValidation(false);
    }

    return setText(textInput);
  };

  const debounedTextHandler = _debounce(handleTextChange, delayTime);

  return [text, debounedTextHandler, isValid];
};

export default useText;
