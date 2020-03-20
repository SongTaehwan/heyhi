import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Layout } from '@components';
import { Pallette } from '@styles';

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
  const [newMatch, setNewMatch] = useState(true);
  const [email, setEmail] = useState(true);
  const [notification, setNotification] = useState(true);
  const [viberation, setViberation] = useState(true);
  const [sound, setSound] = useState(true);

  const list = [
    {
      title: 'New matches',
      subtitle: `You've got a new match with mate.`,
      value: newMatch,
      onValueChange: (value: boolean): void => setNewMatch(value),
    },
    {
      title: 'New matches',
      subtitle: `This message from mates.\nIncluding matching request.`,
      value: newMatch,
      onValueChange: (value: boolean): void => setNewMatch(value),
    },
    {
      title: 'Email',
      value: email,
      onValueChange: (value: boolean): void => setEmail(value),
    },
    {
      title: 'Push Notification',
      value: notification,
      onValueChange: (value: boolean): void => setNotification(value),
    },
    {
      title: 'In-App Viberations',
      value: viberation,
      onValueChange: (value: boolean): void => setViberation(value),
    },
    {
      title: 'In-App Sounds',
      value: sound,
      onValueChange: (value: boolean): void => setSound(value),
    },
  ];
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
              value: item.value,
              trackColor: {
                false: Pallette.matterhorn,
                true: Pallette.brightSkyBlue,
              },
              onValueChange: item.onValueChange,
            }}
          />
        ))}
      </View>
    </Layout>
  );
};

export default Notification;
