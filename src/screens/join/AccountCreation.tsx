import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Layout,
  ContentLayer,
  Title,
  BarButton,
  TextField,
  VSpace,
  HSpace,
  DropBox,
} from '@components';

const styles = StyleSheet.create({
  nameFieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameFieldStyle: {
    paddingHorizontal: 0,
    flex: 1,
  },
});

const AccountCreation = (): JSX.Element => {
  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Making Account'}</Title>
        <VSpace space={30} />
        <TextField placeholder={'Email'} />
        <VSpace space={10} />
        <TextField placeholder={'Password'} />
        <VSpace space={10} />
        <TextField placeholder={'Password Confirm'} />
        <VSpace space={10} />
        <View style={styles.nameFieldWrapper}>
          <TextField
            containerStyle={styles.nameFieldStyle}
            placeholder={'Given Name'}
          />
          <HSpace />
          <TextField
            containerStyle={styles.nameFieldStyle}
            placeholder={'Family Name'}
          />
        </View>
        <VSpace space={10} />
        <DropBox />
      </ContentLayer>
      <BarButton title={'NEXT'} />
    </Layout>
  );
};

export default AccountCreation;
