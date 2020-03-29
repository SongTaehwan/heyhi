import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MyPageStackParamList } from '@routes/types';
import { Layout, ImageView, Divider, Chip, Title, VSpace } from '@components';
import { Pallette } from '@styles';
import { Grades } from '@constant';

interface MyPageProps {
  navigation: StackNavigationProp<MyPageStackParamList, 'MyPage'>;
  route: RouteProp<MyPageStackParamList, 'MyPage'>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  profileWrap: {
    width: '100%',
    height: 120,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  gradeWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  itemWrap: { flex: 2 },
  imageWrap: {
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  infoWrap: {
    width: wp('100%'),
    paddingHorizontal: 20,
  },
  chipWrap: { flex: 1, alignItems: 'flex-start' },
  settingWrap: { flex: 2, alignItems: 'center' },
});

const MyPage = ({ navigation }: MyPageProps): JSX.Element => {
  const user = {
    location: 'Paris',
    email: 'heyhi@gmail.com',
    grade: 'basic',
    profile: '',
    name: 'John Doe',
  };

  const defaultChevron = {
    color: Pallette.brightSkyBlue,
    size: 20,
  };

  const list = [
    {
      title: user.location,
      icon: 'location-pin',
      chevron: { name: 'md-sync' },
    },
    {
      title: 'Language Settings',
      icon: 'globe',
    },
    {
      title: 'My Reviews',
      icon: 'star-outlined',
    },
    {
      title: 'Edit Albums',
      icon: 'camera',
    },
    {
      title: user.email,
      icon: 'mail',
      chevron: { name: 'md-create' },
    },
  ];

  return (
    <Layout containerStyle={styles.container}>
      <View style={styles.profileWrap}>
        <View style={styles.imageWrap}>
          <ImageView
            resizeMode={'contain'}
            source={{ uri: user.profile }}
            style={styles.image}
          />
        </View>
        <View style={styles.infoWrap}>
          <View style={styles.gradeWrap}>
            <View style={styles.chipWrap}>
              <Chip
                text={user.grade.toUpperCase()}
                color={Grades[`${user.grade}`].chipColor}
              />
            </View>
            <View style={styles.settingWrap}>
              <Icon name={'cog'} size={25} color={Pallette.veryLightPink} />
            </View>
          </View>
          <VSpace space={5} />
          <Title h2={true}>{user.name}</Title>
          <VSpace space={5} />
          <Text>
            30{''}MALE{''}USA
          </Text>
        </View>
      </View>
      <Divider />
      <View style={styles.itemWrap}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={
              <Icon name={item.icon} size={20} color={Pallette.brightSkyBlue} />
            }
            bottomDivider
            chevron={
              item.chevron
                ? { ...defaultChevron, name: item.chevron.name }
                : defaultChevron
            }
          />
        ))}
      </View>
    </Layout>
  );
};

export default MyPage;
