import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Layout, HeadDivider, Divider } from '@components';
import { MyReviewProps } from './MyReviews';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  reviewerWrap: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
});

const MyReviewDetail = ({ route }: MyReviewProps): JSX.Element => {
  const { reviewId } = route.params;

  return (
    <Layout>
      <HeadDivider />
      <View style={styles.container}>
        <View style={styles.reviewerWrap}>
          <Text>Review detail</Text>
        </View>
      </View>
    </Layout>
  );
};

export default MyReviewDetail;
