import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Layout, BarButton, TextField, Divider, VSpace } from '@components';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
});

const ChnagePassword = (): JSX.Element => {
  return (
    <Layout>
      <View style={styles.wrapper}>
        <VSpace space={40} />
        <TextField placeholder={'Current Password'} />

        <VSpace space={40} />
        <Divider />
        <VSpace space={40} />

        <TextField placeholder={'New Password'} />

        <VSpace space={20} />

        <TextField placeholder={'New Password Confirm'} />
      </View>
      <BarButton title="DONE" />
    </Layout>
  );
};

export default ChnagePassword;
