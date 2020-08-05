import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ContentContainer, Divider, VSpace, HeadDivider } from '@components';

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});

const Hisgtory = (): JSX.Element => {
  const historyList = [
    { title: '2020.12.12 6PM Paris with James' },
    { title: '2020.12.12 6PM Paris with James' },
  ];

  return (
    <ContentContainer>
      <HeadDivider />
      {historyList.map((item, i) => (
        <>
          <View style={styles.wrap} key={i}>
            <Text>{item.title}</Text>
            <VSpace space={8} />
          </View>
          <Divider />
        </>
      ))}
    </ContentContainer>
  );
};

export default Hisgtory;
