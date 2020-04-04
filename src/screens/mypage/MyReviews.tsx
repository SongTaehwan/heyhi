import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Layout, HSpace, VSpace, ImageView } from '@components';
import { Pallette } from '@styles';

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
    backgroundColor: Pallette.veryLightPinkThree,
    borderRadius: 50,
  },
  textWrap: {
    flex: 4,
  },
  revieweeWrap: {
    flexDirection: 'row',
  },
});

const MyReviews = (): JSX.Element => {
  // TODO: Get reviews from API
  const reviews = [
    {
      reviewee: {
        profile: '',
        name: 'John Doe',
        age: '30',
        gender: 'male',
        nationality: 'usa',
      },
      content:
        'Excepteure sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    },
    {
      reviewee: {
        profile: '',
        name: 'John Doe',
        age: '30',
        gender: 'male',
        nationality: 'usa',
      },
      content:
        'Excepteure sint occaecat cupidatat non proident, sunt in culpa qui officia. asdfasdfasdfasdfasdfasdfasdfasdfasdf',
    },
  ];

  return (
    <Layout>
      <View style={styles.container}>
        {reviews.map((review, i) => (
          <>
            <View key={i} style={styles.reviewWrap}>
              <View style={styles.profileImageWrap}>
                <ImageView
                  resizeMode={'contain'}
                  source={{ uri: review.reviewee.profile }}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.textWrap}>
                <View style={styles.revieweeWrap}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {review.reviewee.name}
                  </Text>
                  <HSpace space={10} />
                  <Text>{review.reviewee.age}</Text>
                  <HSpace space={10} />
                  <Text>{review.reviewee.gender.toUpperCase()}</Text>
                  <HSpace space={10} />
                  <Text>{review.reviewee.nationality.toUpperCase()}</Text>
                </View>
                <VSpace space={4} />
                <Text numberOfLines={2}>{review.content}</Text>
              </View>
            </View>
            <VSpace space={20} />
          </>
        ))}
      </View>
    </Layout>
  );
};

export default MyReviews;
