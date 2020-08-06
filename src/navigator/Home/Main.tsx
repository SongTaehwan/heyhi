import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { Image, Icon } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';
import MapView from 'react-native-maps';
import React, { useState } from 'react';
import {
  Text,
  VSpace,
  BarButton,
  HorizontalView,
  ContentContainer,
} from '@components';
import { getRelativeWidth, getRelativeHeight } from '@util/Dimensions';
import { QUERY_MEMBER_AROUND_ME } from '@api/query';
import { StyleSheets, Colors } from '@constants';

interface Item {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  country: string;
  distance: number;
  uri: string;
}

const DATA = [
  {
    id: 1,
    firstName: 'Jay',
    lastName: 'Lim',
    age: 30,
    gender: 'MALE',
    country: 'USA',
    distance: 100,
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 2,
    firstName: 'June',
    lastName: 'Park',
    age: 30,
    gender: 'MALE',
    country: 'USA',
    distance: 470,
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 3,
    firstName: 'Yeong',
    lastName: 'Park',
    age: 30,
    gender: 'FEMALE',
    country: 'Korea',
    distance: 500,
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 4,
    firstName: 'Suyeon',
    lastName: 'Kim',
    age: 30,
    gender: 'MALE',
    country: 'USA',
    distance: 259,
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
  {
    id: 5,
    firstName: 'Lee',
    lastName: 'Kim',
    age: 30,
    gender: 'MALE',
    country: 'USA',
    distance: 840,
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 6,
    firstName: 'Hong',
    lastName: 'Lim',
    age: 30,
    gender: 'MALE',
    country: 'USA',
    distance: 980,
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
];

const Main = (): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0);
  const [currentItem, setItem] = useState(DATA[0]);

  const { loading, data } = useQuery(QUERY_MEMBER_AROUND_ME, {
    onError: (e) => {
      console.log(e);
    },
  });

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
    setItem(DATA[slideIndex]);
  };

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
              data={DATA}
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
              {`${currentItem.firstName} ${currentItem.lastName}`}
            </Text>
            <VSpace space={getRelativeHeight(15)} />
            <Text
              center>{`${currentItem.age}  ${currentItem.gender}  ${currentItem.country}`}</Text>
            <VSpace space={getRelativeHeight(15)} />
            <HorizontalView horizontalAlign={'center'}>
              <Icon
                type={'font-awesome-5'}
                name={'map-marker-alt'}
                size={15}
                containerStyle={{ paddingTop: 1 }}
              />
              <Text center>{` ${currentItem.distance}m`}</Text>
            </HorizontalView>
          </View>
        </View>
        <Pagination
          activeDotIndex={pageIndex}
          dotsLength={DATA.length}
          containerStyle={{
            paddingVertical: getRelativeHeight(20),
          }}
          inactiveDotScale={1}
          dotStyle={{ transform: [{ scale: 1.2 }] }}
          inactiveDotColor={Colors.brownGrey}
          dotColor={Colors.black}
        />
        <BarButton round containerStyle={{ paddingHorizontal: '10%' }} />
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
