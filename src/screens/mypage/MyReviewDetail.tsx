import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  Layout,
  HeadDivider,
  Divider,
  ImageView,
  Title,
  VSpace,
} from '@components';
import { Pallette } from '@styles';
import { MyReviewProps } from './MyReviews';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  reviewerWrap: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  profileImageWrap: {
    flex: 1,
  },
  profile: {
    width: 60,
    height: 60,
    backgroundColor: Pallette.veryLightPinkThree,
    borderRadius: 50,
  },
  infoWrap: {
    width: wp('100%'),
    paddingLeft: 80,
  },
  contentsWrap: {
    flex: 2,
  },
  contents: {
    fontSize: 15,
    lineHeight: 24,
  },
});

const MyReviewDetail = ({ route }: MyReviewProps): JSX.Element => {
  const { reviewId } = route.params;
  // TODO get review by id
  const review = {
    reviewer: {
      name: 'Jay Lim',
      age: 30,
      gender: 'male',
      nationality: 'usa',
      profile: '',
    },
    content:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
  };

  return (
    <Layout>
      <HeadDivider />
      <View style={styles.container}>
        <View style={styles.reviewerWrap}>
          <View style={styles.profileImageWrap}>
            <ImageView
              resizeMode={'contain'}
              source={{ uri: review.reviewer.profile }}
              style={styles.profile}
            />
          </View>
          <View style={styles.infoWrap}>
            <Title h2={true}>{review.reviewer.name}</Title>
            <VSpace space={5} />
            <Text>
              {review.reviewer.age} {review.reviewer.gender.toUpperCase()}{' '}
              {review.reviewer.nationality.toUpperCase()}
            </Text>
          </View>
        </View>
        <Divider />
        <VSpace space={10} />
        <View style={styles.contentsWrap}>
          <Text style={styles.contents}>{review.content}</Text>
        </View>
      </View>
    </Layout>
  );
};

export default MyReviewDetail;
