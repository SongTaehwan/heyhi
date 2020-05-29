import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Title,
  VSpace,
  Content,
  BarButton,
  HorizontalView,
  CheckableButton,
  ContentContainer,
  HSpace,
} from '@components';
import {
  AppFlow,
  Screens,
  SignUpStackNavigationProps,
} from '@navigation/types';

interface InterestSelectionProps {
  navigation: SignUpStackNavigationProps<Screens.InterestSelection>;
}

enum Interests {
  short = 'short',
  long = 'long',
  reallyLoing = 'reallyLong',
}

const styles = StyleSheet.create({
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

  const handleOnCheckInterest = (value: Interests): void => {
    setInterest((prev) => {
      const targetValue = value;
      return {
        ...prev,
        [targetValue]: !prev[targetValue],
      };
    });
  };

  return (
    <ContentContainer>
      <Content>
        <Title title center text={'My Interests'} />
        <VSpace />
        <Title subTitle center text={'Please choose a description of you'} />
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
      </Content>
      <BarButton
        title={`DONE (${intersetCount}/${totalInterests})`}
        disabled={intersetCount === 0}
        onPress={(): void => navigation.navigate(AppFlow.MainTab)}
      />
    </ContentContainer>
  );
};

export default InterestSelection;
