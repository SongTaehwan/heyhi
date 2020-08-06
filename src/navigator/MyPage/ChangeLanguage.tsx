import Icon from 'react-native-vector-icons/Entypo';
import { ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import React from 'react';

import { ContentContainer, HeadDivider } from '@components';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
});

const ChangeLanguage = (): JSX.Element => {
  const languages = ['English'];
  return (
    <ContentContainer>
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
    </ContentContainer>
  );
};

export default ChangeLanguage;
