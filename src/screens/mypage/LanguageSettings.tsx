import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import { Layout, HeadDivider } from '@components';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
});

const LanguageSettings = (): JSX.Element => {
  const languages = ['English'];
  return (
    <Layout>
      <HeadDivider />
      <View>
        {languages.map((language, i) => (
          <ListItem
            key={i}
            title={language}
            chevron={
              <Icon name={'check'} size={20} color={Colors.brightSkyBlue} />
            }
            bottomDivider
            containerStyle={styles.list}
          />
        ))}
      </View>
    </Layout>
  );
};

export default LanguageSettings;
