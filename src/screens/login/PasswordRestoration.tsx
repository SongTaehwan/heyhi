import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { LoginFlowProps, Screens } from '@routes/types';
import useText from '@hooks/useText';
import {
  ContentContainer,
  Title,
  BarButton,
  VSpace,
  TextField,
  Content,
} from '@components';
import { useMutation } from '@apollo/react-hooks';
import { AUTHENTICATION } from '@api/mutation';

type PasswordRestoration = LoginFlowProps<Screens.PasswordRestoration>;

const styles = StyleSheet.create({
  guidText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
});

const PasswordRestoration = ({
  navigation,
}: PasswordRestoration): JSX.Element => {
  const [email, setEmail] = useText('', { isEmail: true });

  const [sendEmail] = useMutation(AUTHENTICATION.SEND_EMAIL, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      navigation.navigate(Screens.PasswordCreation, {
        checkEmail: data.sendEmail.email,
      });
    },
  });

  return (
    <ContentContainer>
      <Content>
        <Title title text="Create a new Password" />
        <VSpace space={30} />
        <Text style={styles.guidText}>
          {
            'To reset your password,\nenter your E-mail address below\nand follow the instructions\nin the E-mail we’ll send you.'
          }
        </Text>
        <VSpace space={30} />
        <TextField
          placeholder="Email"
          onChangeText={setEmail}
          inputContainerStyle={{ width: '90%' }}
        />
      </Content>
      <BarButton
        title="SEND RESET LINK"
        disabled={email.length === 0}
        onPress={(): void => {
          sendEmail({
            variables: {
              data: {
                email,
              },
            },
          });
        }}
      />
    </ContentContainer>
  );
};

export default PasswordRestoration;
