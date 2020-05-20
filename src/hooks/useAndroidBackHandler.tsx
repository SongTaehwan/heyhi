import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type AndroidBackHandler = () => boolean | null | undefined;

const useAndroidBackHandler = (onBackPress: AndroidBackHandler): void => {
  const callback = useCallback(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return (): void =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [onBackPress]);

  useFocusEffect(callback);
};

export default useAndroidBackHandler;
