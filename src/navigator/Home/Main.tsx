import { CommonActions, useFocusEffect } from '@react-navigation/native';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import { View, Dimensions, StyleSheet, Platform, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useCallback, useEffect } from 'react';
import { GeoPosition } from 'react-native-geolocation-service';
import { useQuery, useMutation } from '@apollo/react-hooks';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { ActivityIndicator } from 'react-native-paper';
import { Image, Icon } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import MapView from 'react-native-maps';
import _ from 'lodash';

import {
  Text,
  VSpace,
  BarButton,
  HorizontalView,
  ContentContainer,
} from '@components';
import { getRelativeWidth, getRelativeHeight } from '@util/Dimensions';
import { HomeNavigationProps } from '@navigator/Routes';
import { QUERY_MEMBER_AROUND_ME } from '@api/query';
import {
  MUTATION_LOCATION,
  MUTATION_ACCEPT_MATCHING,
  MUTATION_REQUEST_MATCHING,
} from '@api/mutation';
import { StyleSheets, Colors } from '@constants';
import useLocation from '@hooks/useLocation';
import { getApproxAge } from '@util/age';
import { logError } from '@util/Error';

interface Item {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  country: string;
  distance: number;
  uri: string;
  isMatched: boolean;
  requestedFromMe: boolean;
  requestToMe: boolean;
}

const Main = ({ navigation }: HomeNavigationProps<'Map'>): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0);
  const [currentItem, setItem] = useState<Item>({} as Item);
  const [nearUserList, setNearUserList] = useState<Item[]>([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [trackingLocation, setTrackingLocation] = useState(false);
  const [permisstionGranted, getPermissionGranted] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const userData = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(userData as string));
    };

    getUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('PERMISSION');
      if (permisstionGranted === false) {
        (async (): Promise<any> => {
          try {
            const isIOS = Platform.OS === 'ios';
            const isAndroid = Platform.OS === 'android';

            const result = await checkMultiple([
              PERMISSIONS.IOS.LOCATION_ALWAYS,
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            ]);

            if (
              isIOS &&
              (result[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'granted' ||
                result[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === 'granted')
            ) {
              getPermissionGranted(true);
              return setTrackingLocation(true);
            }

            if (
              isAndroid &&
              (result[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted' ||
                result[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] ===
                  'granted')
            ) {
              getPermissionGranted(true);
              return setTrackingLocation(true);
            }

            const response = await requestMultiple([
              PERMISSIONS.IOS.LOCATION_ALWAYS,
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            ]);

            if (
              isIOS &&
              (response[PERMISSIONS.IOS.LOCATION_ALWAYS] !== 'granted' ||
                response[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== 'granted')
            ) {
              RNExitApp.exitApp();
            }

            if (
              isAndroid &&
              (response[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !==
                'granted' ||
                response[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] !==
                  'granted')
            ) {
              RNExitApp.exitApp();
            }
          } catch (error) {
            console.log(error.message);
          }
        })();
      } else {
        setTrackingLocation(true);
      }

      return (): void => {
        stopPolling();
        setTrackingLocation(false);
        setShouldFetch(false);
      };
    }, [permisstionGranted]),
  );

  const [acceptHey, { loading: acceptLoading }] = useMutation(
    MUTATION_ACCEPT_MATCHING,
    {
      notifyOnNetworkStatusChange: false,
      onCompleted: (data): void => {
        console.log('ACCEPTED: ', data);

        const updated = { ...currentItem, isMatched: true };
        setItem(updated);
        setNearUserList([updated]);

        navigation.navigate('ChatRoom', { roomId: data.chatRoom.id });
      },
      onError: (e) => {
        console.log('HI_ACCEPT_ERROR', e);
      },
    },
  );

  const [requestHey, { loading: requestLoading }] = useMutation(
    MUTATION_REQUEST_MATCHING,
    {
      notifyOnNetworkStatusChange: false,
      onCompleted: (data): void => {
        console.log('REQUESTED: ', data);

        setItem((prev) => ({
          ...prev,
          requestedFromMe: !prev.requestedFromMe,
        }));
        setNearUserList((prev) => {
          const updated = prev.map((user) => {
            if (user.id === currentItem.id) {
              return {
                ...user,
                requestedFromMe: true,
              };
            } else {
              return user;
            }
          });
          return updated;
        });
      },
      onError: (error) => {
        const message = error.message.split(': ').pop() as string;

        if (message.includes('There is already a match')) {
          Alert.alert('Sorry :(', 'Already matched with someone');
        }

        console.log('ERROR_FROM_SERVER: ', message);
      },
    },
  );

  const [updateLocation] = useMutation(MUTATION_LOCATION, {
    notifyOnNetworkStatusChange: false,
    onCompleted: useCallback(
      ({ updateMyLocation }) => {
        console.log('UPDATE_LOCATION');
        console.log(updateMyLocation);

        if (shouldFetch === false) {
          console.log('POLLING_TRIGGERED!');
          setShouldFetch(true);
          startPolling(1000); // 1 min
        }
      },
      [shouldFetch],
    ),
    onError: (e) => {
      console.log('UPDATE_LOCATION: ', e);
    },
  });

  const sendLocation = useCallback(
    ({ coords: { latitude, longitude } }: GeoPosition) => {
      console.log('GET_POSITION');
      updateLocation({
        variables: {
          data: {
            distance: 1000,
            latitude,
            longitude,
          },
        },
      });
    },
    [updateLocation],
  );

  const [err] = useLocation(trackingLocation, sendLocation, {
    enableHighAccuracy: true,
    distanceFilter: 50, // 1KM
    interval: 60000, // 3 min
    fastestInterval: 30000,
  });

  const { loading, startPolling, stopPolling } = useQuery(
    QUERY_MEMBER_AROUND_ME,
    {
      fetchPolicy: 'network-only',
      skip: !shouldFetch,
      // notifyOnNetworkStatusChange: false,
      onCompleted: useCallback(
        ({ getAroundPeople } = { getAroundPeople: [] }) => {
          console.log('trigger');
          if (!shouldFetch) {
            return;
          }

          if (getAroundPeople.length > 0) {
            console.log(getAroundPeople);
            // const matchedUserList = getAroundPeople.filter(
            //   ({ requestMatchings, requestedMatchings }) => {
            //     const myEmail = user.email;

            //     let isMatched = false;

            //     requestMatchings.some(({ requestedMember, state }) => {
            //       const isSentToMe = requestedMember.email === myEmail;

            //       if (isSentToMe && state === 'ACCEPTED') {
            //         isMatched = true;
            //         return false;
            //       }

            //       if (isSentToMe && state === 'REQUESTED') {
            //         return true;
            //       }

            //       return false;
            //     });

            //     requestedMatchings.some(({ requestMember, state }) => {
            //       const sentFromMe = requestMember.email === myEmail;

            //       if (sentFromMe && state === 'ACCEPTED') {
            //         isMatched = true;
            //         return false;
            //       }

            //       if (sentFromMe && state === 'REQUESTED') {
            //         return true;
            //       }

            //       return false;
            //     });

            //     return isMatched;
            //   },
            // );

            // if (matchedUserList.length > 0) {
            //   const mappedMatchedUser = matchedUserList.map(
            //     ({
            //       id,
            //       email,
            //       firstName,
            //       lastName,
            //       nationality,
            //       gender,
            //       birthday,
            //       photos,
            //       distance,
            //       requestMatchings,
            //       requestedMatchings,
            //     }) => {
            //       const myEmail = user.email;

            //       let isMatched = false;

            //       const receivedRequest = requestMatchings.some(
            //         ({ requestedMember, state }) => {
            //           const isSentToMe = requestedMember.email === myEmail;

            //           if (isSentToMe && state === 'ACCEPTED') {
            //             isMatched = true;
            //             return false;
            //           }

            //           if (isSentToMe && state === 'REQUESTED') {
            //             return true;
            //           }

            //           return false;
            //         },
            //       );

            //       const requestFromMe = requestedMatchings.some(
            //         ({ requestMember, state }) => {
            //           const sentFromMe = requestMember.email === myEmail;

            //           if (sentFromMe && state === 'ACCEPTED') {
            //             isMatched = true;
            //             return false;
            //           }

            //           if (sentFromMe && state === 'REQUESTED') {
            //             return true;
            //           }

            //           return false;
            //         },
            //       );

            //       console.log(
            //         'EMAIL: ',
            //         firstName + ' ' + lastName,
            //         receivedRequest,
            //         requestFromMe,
            //       );
            //       return {
            //         id,
            //         email,
            //         firstName,
            //         lastName,
            //         country: nationality?.code ?? 'KR',
            //         gender,
            //         age: getApproxAge(birthday),
            //         uri:
            //           photos?.map((pic) => pic.photo)[0] ??
            //           'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
            //         distance: distance ?? '100',
            //         requestedFromMe: requestFromMe.length > 0,
            //         requestToMe: receivedRequest.length > 0,
            //         isMatched,
            //       };
            //     },
            //   );

            //   setNearUserList(mappedMatchedUser);
            //   setItem(mappedMatchedUser[0]);
            //   return;
            // }

            const nearUsers = getAroundPeople.map(
              ({
                id,
                email,
                firstName,
                lastName,
                nationality,
                gender,
                birthday,
                photos,
                distance,
                requestMatchings,
                requestedMatchings,
              }) => {
                const myEmail = user.email;

                let isMatched = false;

                const receivedRequest = requestMatchings.some(
                  ({ requestedMember, state }) => {
                    const isSentToMe = requestedMember.email === myEmail;

                    if (isSentToMe && state === 'ACCEPTED') {
                      isMatched = true;
                      return false;
                    }

                    if (isSentToMe && state === 'REQUESTED') {
                      return true;
                    }

                    return false;
                  },
                );

                const requestFromMe = requestedMatchings.some(
                  ({ requestMember, state }) => {
                    const sentFromMe = requestMember.email === myEmail;

                    if (sentFromMe && state === 'ACCEPTED') {
                      isMatched = true;
                      return false;
                    }

                    if (sentFromMe && state === 'REQUESTED') {
                      return true;
                    }

                    return false;
                  },
                );

                console.log(
                  'EMAIL: ',
                  firstName + ' ' + lastName,
                  receivedRequest,
                  requestFromMe,
                );
                return {
                  id,
                  email,
                  firstName,
                  lastName,
                  country: nationality?.code ?? 'KR',
                  gender,
                  age: getApproxAge(birthday),
                  uri:
                    photos?.map((pic) => pic.photo)[0] ??
                    'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
                  distance: distance ?? '100',
                  requestedFromMe: requestFromMe.length > 0,
                  requestToMe: receivedRequest.length > 0,
                  isMatched,
                };
              },
            );

            setNearUserList(nearUsers);
            setItem(nearUsers[0]);
          }
        },
        [shouldFetch],
      ),
      onError: useCallback(
        (e) => {
          const message = e.message.split(': ').pop() as string;

          if (message === 'Unauthorized') {
            AsyncStorage.removeItem('ACCESS_TOKEN').then(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'LoginStack' }, { name: 'OnboardingStack' }],
                }),
              );
            });
          }
        },
        [shouldFetch],
      ),
    },
  );

  const renderItem = ({
    item,
    index,
  }: {
    index: number;
    item: Item;
  }): JSX.Element => {
    return <Image containerStyle={styles.image} source={{ uri: item.uri }} />;
  };

  const onChangeIndex = (slideIndex: number): void => {
    setPageIndex(slideIndex);
    setItem(nearUserList[slideIndex]);
  };

  const handleHeyHi = (): void => {
    const isAcceptAction = currentItem.requestToMe;

    if (isAcceptAction) {
      acceptHey({
        variables: {
          data: {
            acceptMessage: 'Hi!',
            requestedMember: { connect: { id: currentItem.id } },
          },
        },
      });
    } else {
      requestHey({
        variables: {
          data: {
            requestMessage: 'Hey!',
            requestedMember: { connect: { id: currentItem.id } },
          },
        },
      });
    }
  };

  if (_.isEmpty(currentItem)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text>
          {loading
            ? 'Loading people around you'
            : 'Unfortunately there is no one around your position'}
        </Text>
        <View style={{ height: 50 }}>{loading && <ActivityIndicator />}</View>
      </View>
    );
  }

  return (
    <ContentContainer>
      <MapView style={styles.map} />
      <BlurView style={styles.blur} blurType={'light'} blurAmount={5} />
      <LinearGradient
        start={{ x: 0.0, y: 0 }}
        end={{ x: 0.0, y: 1 }}
        locations={[0, 0.6]}
        style={styles.gradient}
        colors={['rgba(255,255,255, 0.1)', '#fff']}>
        <View style={styles.contentWrapper}>
          <View style={styles.carouselWrapper}>
            <Carousel
              loop
              data={nearUserList}
              renderItem={renderItem}
              sliderWidth={Dimensions.get('screen').width}
              itemWidth={getRelativeWidth(300)}
              containerCustomStyle={styles.carousel}
              onBeforeSnapToItem={onChangeIndex}
            />
          </View>
          <VSpace space={getRelativeHeight(20)} />
          <View style={styles.profileWrapper}>
            <Text style={StyleSheets.text.nameText} center>
              {`${currentItem?.firstName} ${currentItem?.lastName}`}
            </Text>
            <VSpace space={getRelativeHeight(15)} />
            <Text center>
              {`${currentItem?.age}  ${currentItem?.gender}  ${currentItem?.country}`}
            </Text>
            <VSpace space={getRelativeHeight(15)} />
            <HorizontalView horizontalAlign={'center'}>
              <Icon
                type={'font-awesome-5'}
                name={'map-marker-alt'}
                size={15}
                containerStyle={{ paddingTop: 1 }}
              />
              <Text center>{` ${currentItem?.distance}m`}</Text>
            </HorizontalView>
          </View>
        </View>
        <Pagination
          activeDotIndex={pageIndex}
          dotsLength={nearUserList.length}
          containerStyle={{
            paddingVertical: getRelativeHeight(20),
          }}
          inactiveDotScale={1}
          dotStyle={{ transform: [{ scale: 1.2 }] }}
          inactiveDotColor={Colors.brownGrey}
          dotColor={Colors.black}
        />
        <BarButton
          round
          loading={requestLoading || acceptLoading}
          containerStyle={{ paddingHorizontal: '10%' }}
          disabled={
            currentItem.isMatched ||
            currentItem.requestedFromMe ||
            requestLoading ||
            acceptLoading
          }
          title={
            currentItem.isMatched
              ? 'Matched'
              : currentItem.requestedFromMe
              ? 'Already Sent Hey!'
              : currentItem.requestToMe
              ? 'Accept Request'
              : 'Send Hey!'
          }
          onPress={handleHeyHi}
        />
        <VSpace space={getRelativeHeight(20)} />
      </LinearGradient>
    </ContentContainer>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
  },
  contentWrapper: {
    display: 'flex',
    flexGrow: 1,
  },
  carouselWrapper: {
    flexBasis: '61%',
    justifyContent: 'flex-end',
  },
  profileWrapper: {
    flexBasis: '17%',
  },
  carousel: {
    flexGrow: 0,
    height: getRelativeWidth(300),
  },
  image: {
    borderRadius: 20,
    flex: 1,
  },
});

export default Main;
