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
import { MUTATION_CREATE_MEMBER } from '@api/mutation';
import { LOCAL_QUERY_PERSONAL_INFO } from '@api/query';
import { logError } from '@util/Error';
import { SignUpNavigationProps } from '@navigator/Routes';

enum Interests {
  short = 'short',
  long = 'long',
  reallyLoing = 'reallyLong',
}

interface UserResult {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    nationality: 'MALE' | 'FEMALE';
    password: string;
    birthDate: Date;
    thumbnail: string;
    photos: string;
  };
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

const UserInterest = ({
  navigation,
}: SignUpNavigationProps<'UserInterest'>): JSX.Element => {
  const [interests, setInterest] = useState(initialState);
  const totalInterests = Object.keys(interests).length;
  const intersetCount = Object.values(interests).filter((v) => v).length;
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  // TODO: Create
  const client = useApolloClient();
  const [createUser] = useMutation(MUTATION_CREATE_MEMBER, {
    notifyOnNetworkStatusChange: false,
    onCompleted: (data) => {
      // console.log(data);
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
    const { user } = client.readQuery<UserResult>({
      query: LOCAL_QUERY_PERSONAL_INFO,
    })!;

    console.log(user);
    const { photos, nationality, gender, ...userInfo } = user;

    createUser({
      variables: {
        data: {
          ...userInfo,
          gender: gender.toUpperCase(),
          withdrawalMessage: '',
          role: { connect: { id: 1 } },
          nationality: { connect: { id: nationality } },
          photos: { create: photos },
          refreshToken: { create: { token: '' } },
          payment: { create: { paymentType: 'NO_CHARGE' } },
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
        // onPress={(): void => navigation.navigate("Home")}
        onPress={handleOnSubmit}
      />
    </ContentContainer>
  );
};

export default UserInterest;
