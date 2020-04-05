import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ContentLayer, Title, VSpace, BarButton, Layout } from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';

type InterestSelectionProps = NavigationFlowProps<
  SignUpStackParamList,
  'InterestSelection'
>;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 18,
  },
});

// TODO: Store Token
const InterestSelection = ({
  navigation,
}: InterestSelectionProps): JSX.Element => {
  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'My Interests'}</Title>
        <VSpace />
        <Text style={styles.labelStyle}>
          {'Please choose a description of you'}
        </Text>
        <VSpace space={40} />
      </ContentLayer>
      <BarButton
        title={`DONE (0/5)`}
        onPress={(): void => navigation.navigate('MainFlow')}
      />
    </Layout>
  );
};

export default InterestSelection;
