import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Title,
  VSpace,
  HSpace,
  Content,
  BarButton,
  ErrorMessage,
  HorizontalView,
  CheckableButton,
  ContentContainer,
} from '@components';
import { Screens, SignUpStackNavigationProps } from '@navigation/types';
import { MUTATION_CREATE_MEMBER } from '@api/mutation';
import { LOCAL_QUERY_PERSONAL_INFO } from '@api/query';
import { logError } from '@util/Error';

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
  const [interests, setInterest] = useState(initialState);
  const totalInterests = Object.keys(interests).length;
  const intersetCount = Object.values(interests).filter((v) => v).length;
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  // TODO: Create
  const client = useApolloClient();
  const [createUser] = useMutation(MUTATION_CREATE_MEMBER, {
    notifyOnNetworkStatusChange: false,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: logError(setServerErrorMessage),
  });

  const handleOnCheckInterest = (value: Interests): void => {
    setInterest((prev) => {
      const targetValue = value;
      return {
        ...prev,
        [targetValue]: !prev[targetValue],
      };
    });
  };

  const handleOnSubmit = (): void => {
    const { user } = client.readQuery({ query: LOCAL_QUERY_PERSONAL_INFO });
    const { __typename, ...personalInfo } = user;

    createUser({
      variables: {
        data: {
          ...personalInfo,
          gender: personalInfo.gender.toUpperCase(),
          state: 'APPROVED',
          photos: {
            create: {
              id: 0,
              photo: '',
              type: 'enum',
            },
          },
          role: {
            connect: {
              id: 0,
            },
          },
          nationality: {
            connect: {
              id: 0,
            },
          },
          payment: {
            connect: {
              id: 0,
            },
          },
        },
      },
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
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      <BarButton
        title={`DONE (${intersetCount}/${totalInterests})`}
        disabled={intersetCount === 0}
        // onPress={(): void => navigation.navigate(AppFlow.MainTab)}
        onPress={handleOnSubmit}
      />
    </ContentContainer>
  );
};

export default InterestSelection;
