import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  Layout,
  ContentLayer,
  Title,
  BarButton,
  ImageView,
  VSpace,
  IconButton,
} from '@components';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';
import Modal from 'react-native-modal';

import imgNotice from '@images/imgNotice.png';
import iconExitActive from '@images/iconExitActive.png';

import st from '@styles';
import {
  getCircleRadiusSize,
  getScreenWidth,
  getScreenHeight,
} from '@util/Dimensions';

type SelfieUploadProps = NavigationFlowProps<
  SignUpStackParamList,
  'SelfieUpload'
>;

const imageViewSize = getScreenWidth() - 60;

const styles = StyleSheet.create({
  modalStyle: {
    display: 'flex',
    marginHorizontal: 35,
    flexDirection: 'column',
  },
  modalContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalHeader: {
    display: 'flex',
    position: 'relative',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: st.Pallette.veryLightPinkTwo,
    flexDirection: 'row',
  },
  modalImageContainer: {
    display: 'flex',
    paddingVertical: 25,
    paddingHorizontal: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalImageStyle: {
    height: 220,
    width: 220,
  },
  modalTextContainerStyle: {
    paddingBottom: 30,
    paddingHorizontal: 80,
  },
  modalTextStyle: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  modalErrorTextStyle: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: 'bold',
    color: st.Pallette.grapeFruit,
  },
  iconContainerStyle: {
    width: 30,
    height: 30,
  },
  imageAddIcon: {
    display: 'flex',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: st.Pallette.brightSkyBlue,
    borderRadius: getCircleRadiusSize(),
    backgroundColor: st.Pallette.transparent,
  },
  image: {
    display: 'flex',
    flex: 1,
    width: imageViewSize,
    height: imageViewSize,
    borderRadius: 35,
    backgroundColor: '#000',
  },
});

const SelfieUpload = ({ navigation }: SelfieUploadProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPictureVisible, setIsPictureVisivle] = useState<boolean>(false);
  const [image, setImage] = useState();

  const getImageFromGallery = async (): Promise<void> => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
        writeTempFile: true,
      });

      console.log('image', image);
      setImage(image.path);

      setIsPictureVisivle(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Now, Let’s take a selfie!'}</Title>
        <VSpace space={80} />
        {isPictureVisible ? (
          <View style={{ width: '100%' }}>
            <Image
              resizeMode={'cover'}
              source={{ uri: image }}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              iconSize={30}
              iconName={'plus'}
              iconContainerStyle={styles.imageAddIcon}
              onPress={getImageFromGallery}
            />
            <VSpace space={30} />
            <Text style={styles.modalTextStyle}>This picture is for the</Text>
            <Text style={styles.modalTextStyle}>
              other person to recognize you.
            </Text>
            <VSpace space={25} />
            <Text style={styles.modalErrorTextStyle}>
              We dont judge you by your appearance
            </Text>
          </View>
        )}

        <Modal
          isVisible={isVisible}
          style={styles.modalStyle}
          animationOut={'fadeOut'}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={(): void => {
                  setIsVisible(false);
                }}>
                <ImageView
                  source={iconExitActive}
                  style={styles.iconContainerStyle}
                />
              </TouchableOpacity>

              <Text style={styles.modalTextStyle}>Notice</Text>
              <View style={styles.iconContainerStyle} />
            </View>
            <View style={styles.modalImageContainer}>
              <ImageView style={styles.modalImageStyle} source={imgNotice} />
            </View>
            <View style={styles.modalTextContainerStyle}>
              <Text style={styles.modalTextStyle}>Please take off your</Text>
              <Text style={styles.modalTextStyle}>sunglasses or cap :(</Text>
            </View>
          </View>
        </Modal>
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        disabled={isPictureVisible ? false : true}
        onPress={(): void => navigation.navigate('InterestSelection')}
      />
    </Layout>
  );
};

export default SelfieUpload;
