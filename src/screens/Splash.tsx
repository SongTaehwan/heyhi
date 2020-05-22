import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-community/async-storage';
import { AppFlow, NavigationFlowProps, AppStackParamList } from '@routes/types';
import { CommonActions } from '@react-navigation/native';

type SplashProps = NavigationFlowProps<AppStackParamList, AppFlow.Splash>;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const TITLE = 'Hey, Hi!';
const TOKEN = 'token';

const Splash = ({ navigation }: SplashProps): JSX.Element => {
  const [splashTitle, setSplashTitle] = useState('');
  useEffect(() => {
    async function checkToken(): Promise<string | void> {
      const token = await AsyncStorage.getItem(TOKEN);

      if (token) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: AppFlow.MainFlow }],
          }),
        );
      }

      // NOTE: API reference: https://reactnavigation.org/docs/nesting-navigators/
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: AppFlow.LoginFlow }, { name: AppFlow.TutorialFlow }],
        }),
      );
    }

    RNBootSplash.hide({ duration: 200 });

    for (let i = 0; i < TITLE.length; i++) {
      setTimeout(() => {
        setSplashTitle((prevTitle) => prevTitle + TITLE[i]);

        if (i === TITLE.length - 1) {
          setTimeout(() => {
            checkToken();
          }, 100);
        }
      }, 100 * i);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{splashTitle}</Text>
    </View>
  );
};

export default Splash;
