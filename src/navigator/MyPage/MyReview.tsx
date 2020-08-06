import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';

import {
  ContentContainer,
  HSpace,
  VSpace,
  ImageView,
  HeadDivider,
  Loading,
} from '@components';
import { MyPageNavigationProps } from '@navigator/Routes';
import { QUERY_REVIEWS } from '@api/query';
import { Colors } from '@constants';
import { getAge } from '@util/age';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reviewWrap: {
    flex: 1,
    height: 80,
    borderColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  profileImageWrap: {
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    backgroundColor: Colors.veryLightPinkThree,
    borderRadius: 50,
  },
  textWrap: {
    flex: 4,
  },
  reviewerWrap: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
  },
});

const MyReview = ({
  navigation,
}: MyPageNavigationProps<'MyReview'>): JSX.Element => {
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews ?? [];

  return (
    <ContentContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HeadDivider />
          <View style={styles.container}>
            {reviews.map((review, i) => (
              <>
                <TouchableOpacity
                  key={i}
                  style={styles.reviewWrap}
                  onPress={(): void =>
                    navigation.navigate('ReviewDetail', {
                      id: review.id,
                    })
                  }>
                  <View style={styles.profileImageWrap}>
                    <ImageView
                      resizeMode={'contain'}
                      source={{ uri: review.reviewer.thumbnail }}
                      style={styles.profileImage}
                    />
                  </View>
                  <View style={styles.textWrap}>
                    <View style={styles.reviewerWrap}>
                      <Text style={styles.name}>
                        {review.reviewer.firstName} {review.reviewer.lastName}
                      </Text>
                      <HSpace space={10} />
                      <Text>{getAge(review.reviewer.birthday)}</Text>
                      <HSpace space={10} />
                      <Text>{review.reviewer.gender.toUpperCase()}</Text>
                      <HSpace space={10} />
                      <Text>
                        {review.reviewer.nationality.code.toUpperCase()}
                      </Text>
                    </View>
                    <VSpace space={4} />
                    <Text numberOfLines={2}>{review.contents}</Text>
                  </View>
                </TouchableOpacity>
                <VSpace space={20} />
              </>
            ))}
          </View>
        </>
      )}
    </ContentContainer>
  );
};

export default MyReview;
