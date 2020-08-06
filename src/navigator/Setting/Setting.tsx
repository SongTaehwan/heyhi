import Icon from 'react-native-vector-icons/Entypo';
import { ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import React from 'react';

import { SettingNavigationProps, SettingRoutes } from '@navigator/Routes';
import { ContentContainer, Title } from '@components';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  titleFirst: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleSecond: {
    padding: 20,
  },
});

type SettingItme = {
  title: string;
  icon: string;
  routeName: keyof SettingRoutes;
};

const settings: SettingItme[] = [
  {
    title: 'Change Password',
    icon: 'key',
    routeName: 'ChangePassword',
  },
  {
    title: 'Payments Methods',
    icon: 'credit-card',
    routeName: 'Payment',
  },
  {
    title: 'Notification',
    icon: 'megaphone',
    routeName: 'NotificationControl',
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

const Setting = ({
  navigation,
}: SettingNavigationProps<'Setting'>): JSX.Element => {
  return (
    <ContentContainer>
      <View>
        <Title text={'General Settings'} style={styles.titleFirst} />
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

        <Title text={'Customer'} style={styles.titleSecond} />
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

export default Setting;
