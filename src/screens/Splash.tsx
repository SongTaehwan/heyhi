import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
// import st from '@styles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    // color: st.Pallette.robinSEgg,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const title = 'Hey, Hi!';

const Splash = (): JSX.Element => {
  const [splashTitle, setSplashTitle] = useState('');
  useEffect(() => {
    for (let i = 0; i < title.length; i++) {
      setTimeout(() => {
        setSplashTitle(prevTitle => prevTitle + title[i]);
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
