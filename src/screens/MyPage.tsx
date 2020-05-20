import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MyPageStackParamList, Screens } from '@routes/types';
import {
  ImageView,
  Divider,
  Chip,
  Title,
  VSpace,
  ContentContainer,
} from '@components';
import { Grades, Colors } from '@constants';
import Logo from '@images/logoSmallWhiteHalf.png';

interface MyPageProps {
  navigation: StackNavigationProp<MyPageStackParamList, 'MyPage'>;
  route: RouteProp<MyPageStackParamList, 'MyPage'>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  logo: { width: 50, height: 28 },
  noticeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brightSkyBlue,
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: Colors.cornflowerBlue,
  },
  notice: {
    paddingLeft: 10,
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  noticeIcon: { position: 'absolute', right: 10 },
  profileWrap: {
    height: 120,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: Colors.veryLightPinkThree,
    borderRadius: 50,
  },
  profileImageEditBtnWrap: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  profileImageEditBtnView: {
    width: 42,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.veryLightPinkFour,
    borderColor: Colors.veryLightPinkFour,
  },
  profileImageEditBtnText: { fontSize: 10, color: Colors.brownGrey },
  infoWrap: {
    width: wp('100%'),
    paddingHorizontal: 20,
  },
  iconWrap: {
    paddingRight: 10,
    borderRightColor: Colors.veryLightPink,
    borderRightWidth: 1,
  },
  itemWrap: {},
  chipWrap: { alignItems: 'flex-start' },
  settingWrap: { position: 'absolute', right: 105 },
  logoutWrap: { alignSelf: 'center' },
  logoutView: {
    width: 95,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.veryLightPink,
  },
  logoutText: {
    color: Colors.brownishGrey,
    fontSize: 14,
    fontWeight: '400',
  },
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
    color: Colors.brightSkyBlue,
    size: 20,
  };

  const list = [
    {
      title: user.location,
      subtitle: 'My Current Location',
      subtitleStyle: { fontSize: 12, color: Colors.taupeGray },
      icon: 'location-pin',
      chevron: { name: 'md-sync' },
      onpress: (): void => {
        console.log('update location');
      },
    },
    {
      title: 'Language Settings',
      icon: 'globe',
      routeName: 'LanguageSettings',
    },
    {
      title: 'My Reviews',
      icon: 'star-outlined',
      routeName: 'MyReviews',
    },
    {
      title: 'Edit Albums',
      icon: 'camera',
      routeName: 'EditAlbums',
    },
    {
      title: user.email,
      icon: 'mail',
      chevron: { name: 'md-create' },
      routeName: 'EditEmail',
    },
  ];

  return (
    <ContentContainer containerStyle={styles.container}>
      {user.grade === '' && (
        <View style={styles.noticeWrap}>
          <ImageView resizeMode={'contain'} source={Logo} style={styles.logo} />
          <Text style={styles.notice}>Become out Hey,Hi Member</Text>
          <Icon
            name={'chevron-right'}
            color={'white'}
            size={20}
            style={styles.noticeIcon}
          />
        </View>
      )}

      <View style={styles.profileWrap}>
        <View>
          <ImageView
            resizeMode={'contain'}
            source={{ uri: user.profile }}
            style={styles.image}
          />
          <View style={styles.profileImageEditBtnWrap}>
            <Chip
              text={'EDIT'}
              viewStyle={styles.profileImageEditBtnView}
              textStyle={styles.profileImageEditBtnText}
            />
          </View>
        </View>
        <View style={styles.infoWrap}>
          <View>
            {user.grade !== '' && (
              <View style={styles.chipWrap}>
                <Chip
                  text={user.grade.toUpperCase()}
                  color={Grades[`${user.grade}`].chipColor}
                />
              </View>
            )}
            <View style={styles.settingWrap}>
              <Icon
                name={'cog'}
                size={25}
                color={Colors.veryLightPink}
                onPress={(): void => navigation.navigate(Screens.Settings)}
              />
            </View>
          </View>
          <VSpace space={5} />
          <Title h2={true}>{user.name}</Title>
          <VSpace space={5} />
          <Text>30 MALE USA</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.itemWrap}>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            subtitle={item?.subtitle}
            subtitleStyle={item?.subtitleStyle}
            leftElement={
              <View style={styles.iconWrap}>
                <Icon name={item.icon} size={20} color={Colors.brightSkyBlue} />
              </View>
            }
            bottomDivider
            chevron={
              item.chevron
                ? { ...defaultChevron, name: item.chevron.name }
                : defaultChevron
            }
            onPress={
              item.routeName
                ? (): void => navigation.navigate(item.routeName)
                : item.onpress
            }
          />
        ))}
      </View>
      <VSpace space={40} />
      <View style={{ alignSelf: 'center' }}>
        <Chip
          text={'Log Out'}
          viewStyle={styles.logoutView}
          textStyle={styles.logoutText}
        />
      </View>
    </ContentContainer>
  );
};

export default MyPage;
