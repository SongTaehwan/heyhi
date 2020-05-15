import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Layout, Title, VSpace, BarButton } from '@components';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  noticeWrap: {
    alignItems: 'center',
    paddingTop: 36,
  },
  warnText: {
    color: Colors.grapefruit,
  },
  uploadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  upload: {
    width: wp('42.6%'),
    height: wp('42.6%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.veryLightPink,
    marginBottom: 15,
  },
});

const EditAlbums = (): JSX.Element => {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.noticeWrap}>
          <Title h2={true}>Click to upload images</Title>
          <VSpace space={14} />
          <Title h4={true} style={styles.warnText}>
            You cannot upload face pictures!
          </Title>
        </View>
        <VSpace space={54} />
        <View style={styles.uploadWrap}>
          <View style={styles.upload}>
            <Title h1={true} style={{ color: Colors.brightSkyBlue }}>
              +
            </Title>
          </View>
          <View style={styles.upload}>
            <Title h1={true} style={{ color: Colors.brightSkyBlue }}>
              +
            </Title>
          </View>
          <View style={styles.upload}>
            <Title h1={true} style={{ color: Colors.brightSkyBlue }}>
              +
            </Title>
          </View>
          <View style={styles.upload}>
            <Title h1={true} style={{ color: Colors.brightSkyBlue }}>
              +
            </Title>
          </View>
        </View>
      </View>
      <BarButton title="DONE" />
    </Layout>
  );
};

export default EditAlbums;
