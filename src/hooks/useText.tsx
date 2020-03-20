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

// NOTE: Only check if correct form of JWT or Email
const useText = (
  initialState = '',
  options: TextHookOption = defaultOption,
): [string, (text: string) => void] => {
  const {
    isEmail = false,
    isJWT = false,
    isMobilePhone = false,
    delayTime = 300,
  } = options;
  const [text, setText] = useState<string>(initialState);

  // TODO: Refactor
  const handleTextChange = (textInput: string): void => {
    if (isEmail && validator.isEmail(textInput)) {
      return setText(textInput);
    }

    if (isJWT && validator.isJWT(textInput)) {
      return setText(textInput);
    }

    if (isMobilePhone && validator.isMobilePhone(textInput, 'ko-KR')) {
      return setText(textInput);
    }

    if (!isEmail && !isJWT && !isMobilePhone) {
      return setText(textInput);
    }

    return setText(initialState);
  };

  const debounedTextHandler = _debounce(handleTextChange, delayTime);

  return [text, debounedTextHandler];
};

export default useText;
