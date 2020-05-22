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
): [string, (text: string) => void] => {
  const { isEmail = false, isMobilePhone = false, delayTime = 300 } = options;
  const [text, setText] = useState<string>(initialState);

  const handleTextChange = (textInput: string): void => {
    if (isEmail && validator.isEmail(textInput)) {
      return setText(textInput);
    }

    if (isMobilePhone && validator.isMobilePhone(textInput, 'ko-KR')) {
      return setText(textInput);
    }

    return setText(textInput);
  };

  const debounedTextHandler = _debounce(handleTextChange, delayTime);

  return [text, debounedTextHandler];
};

export default useText;
