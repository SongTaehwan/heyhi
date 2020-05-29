import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  ContentContainer,
  HeadDivider,
  Divider,
  ImageView,
  Title,
  VSpace,
  Loading,
} from '@components';
import { Colors } from '@constants';
import { REVIEW } from '@api/query';
import { getAge } from '@util/age';
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
    backgroundColor: Colors.veryLightPinkThree,
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
  const { id } = route.params;
  const { loading, data } = useQuery(REVIEW.GET_REVIEW, {
    variables: { id },
  });

  const { review } = data;

  return (
    <ContentContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
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
                <Title title>
                  {review.reviewer.firstName} {review.reviewer.lastName}
                </Title>
                <VSpace space={5} />
                <Text>
                  {getAge(review.reviewer.birthday)}{' '}
                  {review.reviewer.gender.toUpperCase()}{' '}
                  {review.reviewer.nationality.code.toUpperCase()}
                </Text>
              </View>
            </View>
            <Divider />
            <VSpace space={10} />
            <View style={styles.contentsWrap}>
              <Text style={styles.contents}>{review.contents}</Text>
            </View>
          </View>
        </>
      )}
    </ContentContainer>
  );
};

export default MyReviewDetail;
