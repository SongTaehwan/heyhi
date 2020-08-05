import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import { ContentContainer, HeadDivider } from '@components';
import { Colors } from '@constants';

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
  const [notifications, setNotifications] = useState({
    newMatch: true,
    messages: true,
    email: true,
    push: true,
    viberation: true,
    sound: true,
  });

  useEffect(() => {
    async function setValue(): Promise<void> {
      const value = await AsyncStorage.getItem('notifications');
      if (value) setNotifications(JSON.parse(value));
    }

    setValue();
  }, []);

  useEffect(() => {
    return (): void => {
      AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    };
  });

  const list = [
    {
      title: 'New matches',
      subtitle: `You've got a new match with mate.`,
      value: notifications.newMatch,
      onValueChange: (value: boolean): void =>
        setNotifications({ ...notifications, newMatch: value }),
    },
    {
      title: 'Messages',
      subtitle: `This message from mates.\nIncluding matching request.`,
      value: notifications.messages,
      onValueChange: (value: boolean): void =>
        setNotifications({ ...notifications, messages: value }),
    },
    {
      title: 'Email',
      value: notifications.email,
      onValueChange: (value: boolean): void =>
        setNotifications({ ...notifications, email: value }),
    },
    {
      title: 'Push Notification',
      value: notifications.push,
      onValueChange: (value: boolean): void =>
        setNotifications({ ...notifications, push: value }),
    },
    {
      title: 'In-App Viberations',
      value: notifications.viberation,
      onValueChange: (value: boolean): void =>
        setNotifications({ ...notifications, viberation: value }),
    },
    {
      title: 'In-App Sounds',
      value: notifications.sound,
      onValueChange: (value: boolean): void =>
        setNotifications({ ...notifications, sound: value }),
    },
  ];
  return (
    <ContentContainer>
      <HeadDivider />
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
                false: Colors.matterhorn,
                true: Colors.brightSkyBlue,
              },
              onValueChange: item.onValueChange,
            }}
          />
        ))}
      </View>
    </ContentContainer>
  );
};

export default Notification;
