import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { View, StyleSheet, Alert } from 'react-native';
import { MEMBER } from '@api/mutation';
import {
  ContentContainer,
  BarButton,
  TextField,
  Divider,
  VSpace,
  HeadDivider,
} from '@components';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
});
const ChnagePassword = (): JSX.Element => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [changePasswordMutation] = useMutation(MEMBER.CHANGE_PASSWORD, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log('data', data.changePassword.updated);
      if (data.changePassword.updated) {
        Alert.alert('비밀번호가 수정 되었습니다.');
      }
    },
    onError: (error) => {
      Alert.alert(JSON.parse(error.graphQLErrors[0].message).message);
    },
  });
  const changePassword = (): void => {
    // TODO: validation
    changePasswordMutation({
      variables: {
        data: { currentPassword, newPassword },
      },
    });
  };
  return (
    <ContentContainer>
      <HeadDivider />
      <View style={styles.wrapper}>
        <VSpace space={40} />
        <TextField
          secureTextEntry={true}
          value={currentPassword}
          placeholder={'Current Password'}
          onChangeText={setCurrentPassword}
        />
        <VSpace space={40} />
        <Divider />
        <VSpace space={40} />
        <TextField
          secureTextEntry={true}
          value={newPassword}
          placeholder={'New Password'}
          onChangeText={setNewPassword}
        />
        <VSpace space={20} />
        <TextField
          secureTextEntry={true}
          value={newPasswordConfirm}
          placeholder={'New Password Confirm'}
          onChangeText={setNewPasswordConfirm}
        />
      </View>
      <BarButton title="DONE" onPress={changePassword} />
    </ContentContainer>
  );
};
export default ChnagePassword;
