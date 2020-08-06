import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import GeoLocation from 'react-native-geolocation-service';
import {
  Text,
  Chip,
  Title,
  VSpace,
  Divider,
  ImageView,
  HorizontalView,
  ContentContainer,
  HSpace,
} from '@components';
import { Grades, Colors } from '@constants';
import Logo from '@images/logoSmallWhiteHalf.png';
import { HomeNavigationProps } from '@navigator/Routes';

const styles = StyleSheet.create({
  container: {
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
    paddingVertical: 20,
  },
  avatarContainerImage: {
    width: 80,
    height: 80,
  },
  avatar: {
    borderRadius: 40,
    opacity: 0.4,
  },
  profileImageEditBtnWrap: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  profileEditBtn: {
    width: 42,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 9,
    paddingRight: 9,
    borderRadius: 7,
    backgroundColor: Colors.veryLightPinkFour,
    borderColor: Colors.veryLightPinkFour,
  },
  prifileEditText: {
    fontSize: 10,
    color: Colors.brownGrey,
  },
  iconWrap: {
    paddingRight: 10,
    borderRightColor: Colors.veryLightPink,
    borderRightWidth: 1,
  },
  itemWrap: {},
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

const MyPage = ({ navigation }: HomeNavigationProps<'MyPage'>): JSX.Element => {
  const [location, setLocation] = useState('');
  const setAddress = (): void => {
    GeoLocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        AsyncStorage.setItem('coords', JSON.stringify({ latitude, longitude }));

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${Config.GOOGLE_MAP_API_KEY}`,
        )
          .then((response) => response.json())
          .then((responseJson) => {
            const _location =
              responseJson.results[responseJson.results.length - 2]
                .formatted_address;

            AsyncStorage.setItem('location', _location);

            setLocation(_location);
          });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    setAddress();
  }, []);

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
      title: location,
      subtitle: 'My Current Location',
      subtitleStyle: { fontSize: 12, color: Colors.taupeGray },
      icon: 'location-pin',
      chevron: { name: 'md-sync' },
      onpress: (): void => setAddress(),
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

  const goToSettings = (): void => {
    navigation.navigate('MyPageStack', { screen: 'Setting' });
  };

  return (
    <ContentContainer containerStyle={styles.container}>
      {user.grade === '' && (
        <View style={styles.noticeWrap}>
          <ImageView resizeMode={'contain'} source={Logo} style={styles.logo} />
          <Text style={styles.notice}>Become out Hey,Hi Member</Text>
          <Icon
            type={'entypo'}
            name={'chevron-right'}
            color={'white'}
            size={20}
            style={styles.noticeIcon}
          />
        </View>
      )}
      <HorizontalView style={styles.profileWrap}>
        <ProfileAvatar source={{ uri: user.profile }} />
        <HSpace space={20} />
        <ProfileContent
          name={user.name}
          grade={user.grade}
          onPressSetting={goToSettings}
        />
      </HorizontalView>
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
                <Icon
                  type={'entypo'}
                  name={item.icon}
                  size={20}
                  color={Colors.brightSkyBlue}
                />
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
                ? (): void =>
                    navigation.navigate('MyPageStack', {
                      screen: item.routeName,
                    })
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

const ProfileAvatar = ({
  source,
}: {
  source: ImageSourcePropType;
}): JSX.Element => {
  return (
    <View>
      <Avatar
        icon={{ name: 'user', type: 'font-awesome', size: 40 }}
        source={source}
        avatarStyle={styles.avatar}
        containerStyle={styles.avatarContainerImage}
      />
      <View style={styles.profileImageEditBtnWrap}>
        <Button
          title="EDIT"
          type={'outline'}
          buttonStyle={styles.profileEditBtn}
          titleStyle={styles.prifileEditText}
        />
      </View>
    </View>
  );
};

const ProfileContent = ({
  name = 'name',
  grade,
  onPressSetting,
  nationality = 'USA',
  gender = 'MALE',
  age,
}: {
  name: string;
  grade: 'basic' | 'premium' | 'vip' | 'vvip';
  nationality: string;
  gender: 'MALE' | 'FEMALE';
  onPressSetting(): void;
}): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <HorizontalView horizontalAlign={'space-between'}>
        {grade && (
          <Chip text={grade.toUpperCase()} color={Grades[grade].chipColor} />
        )}
        <Icon
          type={'entypo'}
          name={'cog'}
          size={25}
          color={Colors.veryLightPink}
          onPress={onPressSetting}
        />
      </HorizontalView>

      <Title subTitle bold text={name} />
      <VSpace space={5} />
      <Text>
        <Text>30 </Text>
        <Text>{gender} </Text>
        <Text>{nationality}</Text>
      </Text>
    </View>
  );
};

export default MyPage;
