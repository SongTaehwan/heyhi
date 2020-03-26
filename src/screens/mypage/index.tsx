import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MyPageStackParamList } from '@routes/types';
import { Layout } from '@components';

interface MyPageProps {
  navigation: StackNavigationProp<MyPageStackParamList, 'MyPage'>;
  route: RouteProp<MyPageStackParamList, 'MyPage'>;
}

const MyPage = ({ navigation }: MyPageProps): JSX.Element => {
  return <Layout>MyPage</Layout>;
};

export default MyPage;
