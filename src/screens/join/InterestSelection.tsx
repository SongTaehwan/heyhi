import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  Layout,
  ContentLayer,
  Title,
  VSpace,
  BarButton,
  CheckableButton,
  HorizontalView,
  HSpace,
} from '@components';
import {
  NavigationFlowProps,
  SignUpStackParamList,
  RootStackParamList,
  AppFlow,
} from '@routes/types';

type InterestSelectionProps = NavigationFlowProps<
  SignUpStackParamList & RootStackParamList,
  'InterestSelection'
>;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 18,
  },
  shorButton: {
    flex: 0.35,
  },
  longButton: {
    flex: 0.65,
  },
});

const initialState = {
  short: false,
  long: false,
  reallyLong: false,
};

const InterestSelection = ({
  navigation,
}: InterestSelectionProps): JSX.Element => {
  // TODO: Set interest into local query
  const [interests, setInterest] = useState(initialState);
  const totalInterests = Object.keys(interests).length;
  const intersetCount = Object.values(interests).filter((v) => v).length;

  const handleOnCheckInterest = (value: string): void => {
    console.log(value);
    setInterest((prev) => {
      const targetValue = value;
      return {
        ...prev,
        [targetValue]: !prev[targetValue],
      };
    });
  };

  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'My Interests'}</Title>
        <VSpace />
        <Text style={styles.labelStyle}>
          {'Please choose a description of you'}
        </Text>
        <VSpace space={40} />
        <HorizontalView>
          <CheckableButton
            value={'short'}
            checked={interests.short}
            title={'SHORT'}
            containerStyle={styles.shorButton}
            onPress={handleOnCheckInterest}
          />
          <HSpace />
          <CheckableButton
            value={'long'}
            checked={interests.long}
            title={'LONG'}
            containerStyle={styles.longButton}
            onPress={handleOnCheckInterest}
          />
        </HorizontalView>
        <VSpace />
        <CheckableButton
          value={'reallyLong'}
          checked={interests.reallyLong}
          title={'REALLY LOING'}
          onPress={handleOnCheckInterest}
        />
      </ContentLayer>
      <BarButton
        title={`DONE (${intersetCount}/${totalInterests})`}
        disabled={intersetCount === 0}
        onPress={(): void => navigation.navigate(AppFlow.MainFlow)}
      />
    </Layout>
  );
};

export default InterestSelection;
