import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SettingsStackParamList } from '@navigation/types';

import { Title, HeadDivider, ContentContainer } from '@components';
import { Colors } from '@constants';

interface SettingsProps {
  navigation: StackNavigationProp<SettingsStackParamList, 'Settings'>;
  route: RouteProp<SettingsStackParamList, 'Settings'>;
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
  },
  titleFirst: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleSecond: {
    padding: 20,
  },
});

const settings = [
  {
    title: 'Change Password',
    icon: 'key',
    routeName: 'ChangePassword',
  },
  {
    title: 'Payments Methods',
    icon: 'credit-card',
    routeName: 'PaymentsMethods',
  },
  {
    title: 'Notification',
    icon: 'megaphone',
    routeName: 'Notification',
  },
  {
    title: 'History',
    icon: 'chevron-with-circle-down',
    routeName: 'History',
  },
  {
    title: 'Location',
    icon: 'location-pin',
    routeName: 'Location',
  },
];

const customers = [
  {
    title: 'Contact Us',
  },
  {
    title: 'Privacy Policy',
  },
  {
    title: 'Terms of Service',
  },
  {
    title: 'Give us Feedback',
  },
];

const Settings = ({ navigation }: SettingsProps): JSX.Element => {
  return (
    <ContentContainer>
      <HeadDivider />
      <View>
        <Title h4={true} style={styles.titleFirst}>
          General Settings
        </Title>
        {settings.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={
              <Icon name={item.icon} size={20} color={Colors.brightSkyBlue} />
            }
            bottomDivider
            onPress={(): void => navigation.navigate(item.routeName)}
          />
        ))}

        <Title h4={true} style={styles.titleSecond}>
          Customer
        </Title>
        {customers.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            bottomDivider
            titleStyle={{ textAlign: 'center' }}
          />
        ))}
      </View>
    </ContentContainer>
  );
};

export default Settings;
