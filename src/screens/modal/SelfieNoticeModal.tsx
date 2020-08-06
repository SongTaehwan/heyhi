import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Content, VSpace, Text, NoticeModal, ImageView } from '@components';
import { getRelativeWidth } from '@util/Dimensions';
import { StackNavigationProps, RootModalRoutes } from '@navigator/Routes';

const styles = StyleSheet.create({
  imageSize: {
    width: getRelativeWidth(220),
    height: getRelativeWidth(220),
  },
  content: {
    paddingTop: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    flex: 0,
  },
});

const SelfieNoticeModal = ({
  navigation,
}: StackNavigationProps<RootModalRoutes, 'SelfieNotice'>): JSX.Element => {
  const [isVisible, modalState] = useState(true);

  const hideModal = (): void => {
    modalState(false);
    navigation.goBack();
  };

  return (
    <NoticeModal
      coverScreen={false}
      isVisible={isVisible}
      onClosePress={hideModal}>
      <Content style={styles.content}>
        <ImageView
          source={require('./assets/selfie.png')}
          style={styles.imageSize}
        />
        <VSpace space={20} />
        <Text bold text={'Please take off your\nsunglasses or cap :('} />
      </Content>
    </NoticeModal>
  );
};

export default SelfieNoticeModal;
