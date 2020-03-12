import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Layout } from '@components';
import { Pallette } from '@styles';

const list = [
  {
    title: 'New matches',
    subtitle: `You've got a new match with mate.`,
  },
  {
    title: 'New matches',
    subtitle: `This message from mates.\nIncluding matching request.`,
  },
  {
    title: 'Email',
  },
  {
    title: 'Push Notification',
  },
  {
    title: 'In-App Viberations',
  },
  {
    title: 'In-App Sounds',
  },
];

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  subtitle: {
    marginTop: 20,
    paddingBottom: 4,
  },
});

const Notification = (): JSX.Element => {
  return (
    <Layout>
      <View>
        {list.map((item, i) => (
          <ListItem
            containerStyle={styles.listContainer}
            key={i}
            title={item.title}
            subtitle={item.subtitle}
            subtitleStyle={styles.subtitle}
            bottomDivider
            switch={{
              thumbColor: Pallette.brightSkyBlue,
            }}
          />
        ))}
      </View>
    </Layout>
  );
};

export default Notification;
