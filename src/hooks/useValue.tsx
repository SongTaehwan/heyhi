import _debounce from 'lodash/debounce';
import React, { useState } from 'react';

const useValue = <T,>(
  initialState: T | (() => T),
  delayTime = 300,
): [T, (value: T | ((prevState: T) => T)) => void] => {
  const [value, setValue] = useState<T>(initialState);

  const handleValueChange = (inputValue: React.SetStateAction<T>): void => {
    setValue(inputValue);
  };

  const debounedValueHandler = _debounce(handleValueChange, delayTime);

  return [value, debounedValueHandler];
};

export default useValue;
