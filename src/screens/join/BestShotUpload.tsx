import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import {
  Content,
  Title,
  BarButton,
  VSpace,
  HSpace,
  ContentContainer,
  IconButton,
  Text,
  HorizontalView,
} from '@components';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import Config from 'react-native-config';
import { Screens, SignUpStackNavigationProps } from '@navigation/types';
import { getScreenWidth, getScreenHeight } from '@util/Dimensions';
import { Colors } from '@constants';

import uuidv4 from 'uuid/v4';

import AWS from '../../../aws.config';

interface BestShotUploadProps {
  navigation: SignUpStackNavigationProps<Screens.BestShotUpload>;
}

const imageViewSize = (getScreenWidth() - 60) / 2;
const circleRadiusSize = (getScreenWidth() + getScreenHeight()) / 2;
console.log(imageViewSize, Dimensions.get('screen').width);
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'orange',
    width: '100%',
  },
  imageAddIcon: {
    display: 'flex',
    width: 100,
    height: 100,
    position: 'absolute',
    borderWidth: 1,
    borderColor: Colors.brightSkyBlue,
    borderRadius: circleRadiusSize,
    backgroundColor: Colors.transparent,
    top: imageViewSize - 30,
    left: imageViewSize - 40,
    zIndex: 1000,
  },
  imageLayer: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageViewStyle: {
    width: imageViewSize,
    height: imageViewSize,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.veryLightPink,
  },
  textStyle: {
    position: 'absolute',
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.brightSkyBlue,
    top: imageViewSize + 80,
  },
});

const BestShotUpload = ({ navigation }: BestShotUploadProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [imageOne, setImageOne] = useState<Image | null>(null);
  const [imageTwo, setImageTwo] = useState<Image | null>(null);
  const [imageThree, setImageThree] = useState<Image | null>(null);
  const [imageFour, setImageFour] = useState<Image | null>(null);

  check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      // …
    });

  const getImageFromGallery = async (): Promise<void> => {
    try {
      console.log('Button Clicked!!');
      const images: any = await ImagePicker.openPicker({
        multiple: true,
        writeTempFile: true,
        maxFiles: 4,
      });

      setImageOne(images[0] ?? null);
      setImageTwo(images[1] ?? null);
      setImageThree(images[2] ?? null);
      setImageFour(images[3] ?? null);

      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (): Promise<void> => {
    const bucketPath = Config.BUCKET_PATH + '/BACKGROUND';

    const imageKeyArray = [];
    if (imageOne !== null) {
      const resizedImage = await ImageResizer.createResizedImage(
        imageOne.path,
        1000,
        1000,
        'JPEG',
        90,
      );
      const imageBlob = await fetch(resizedImage.uri).then((res) => res.blob());

      const params = {
        Bucket: bucketPath,
        Key: uuidv4(),
        Body: imageBlob,
      };

      const request = new AWS.S3.ManagedUpload({ params });
      const result = await new Promise((resolve, reject) => {
        return request.send((error, data) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      });

      imageKeyArray.push(result.Key);
    }
    if (imageTwo !== null) {
      const resizedImage = await ImageResizer.createResizedImage(
        imageTwo.path,
        1000,
        1000,
        'JPEG',
        90,
      );
      const imageBlob = await fetch(resizedImage.uri).then((res) => res.blob());

      const params = {
        Bucket: bucketPath,
        Key: uuidv4(),
        Body: imageBlob,
      };

      const request = new AWS.S3.ManagedUpload({ params });
      const result = await new Promise((resolve, reject) => {
        return request.send((error, data) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      });

      imageKeyArray.push(result.Key);
    }
    if (imageThree !== null) {
      const resizedImage = await ImageResizer.createResizedImage(
        imageThree.path,
        1000,
        1000,
        'JPEG',
        90,
      );
      const imageBlob = await fetch(resizedImage.uri).then((res) => res.blob());

      const params = {
        Bucket: bucketPath,
        Key: uuidv4(),
        Body: imageBlob,
      };

      const request = new AWS.S3.ManagedUpload({ params });
      const result = await new Promise((resolve, reject) => {
        return request.send((error, data) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      });

      imageKeyArray.push(result.Key);
    }
    if (imageFour !== null) {
      const resizedImage = await ImageResizer.createResizedImage(
        imageFour.path,
        1000,
        1000,
        'JPEG',
        90,
      );
      const imageBlob = await fetch(resizedImage.uri).then((res) => res.blob());

      const params = {
        Bucket: bucketPath,
        Key: uuidv4(),
        Body: imageBlob,
      };

      const request = new AWS.S3.ManagedUpload({ params });
      const result = await new Promise((resolve, reject) => {
        return request.send((error, data) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
      });

      imageKeyArray.push(result.Key);
    }

    console.log('imageKeyArray', imageKeyArray);
    navigation.navigate(Screens.SelfieUpload);
  };

  return (
    <ContentContainer>
      <Content style={{ paddingHorizontal: 20 }}>
        <PageTitle />

        <View style={styles.imageContainer}>
          {isVisible ? (
            <View>
              <IconButton
                size={30}
                name={'plus'}
                onPress={getImageFromGallery}
              />
              <Text style={styles.textStyle}>Click to add photo</Text>
            </View>
          ) : null}

          <HorizontalView style={{ flexWrap: 'wrap' }}>
            {imageOne === null ? (
              <View style={styles.imageViewStyle} />
            ) : (
              <Image
                resizeMode={'cover'}
                source={{ uri: imageOne?.path }}
                style={styles.imageViewStyle}
              />
            )}
            <HSpace space={20} />
            {imageTwo === null ? (
              <View style={styles.imageViewStyle} />
            ) : (
              <Image
                resizeMode={'cover'}
                source={{ uri: imageTwo?.path }}
                style={styles.imageViewStyle}
              />
            )}
            {imageThree === null ? (
              <View style={styles.imageViewStyle} />
            ) : (
              <Image
                resizeMode={'cover'}
                source={{ uri: imageThree?.path }}
                style={styles.imageViewStyle}
              />
            )}
            <HSpace space={20} />
            {imageFour === null ? (
              <View style={styles.imageViewStyle} />
            ) : (
              <Image
                resizeMode={'cover'}
                source={{ uri: imageFour?.path }}
                style={styles.imageViewStyle}
              />
            )}
          </HorizontalView>
          {/* <VSpace space={20} />
          <View style={styles.imageLayer}>
            {imageThree === null ? (
              <View style={styles.imageViewStyle} />
            ) : (
              <Image
                resizeMode={'cover'}
                source={{ uri: imageThree?.path }}
                style={styles.imageViewStyle}
              />
            )}
            <HSpace space={20} />
            {imageFour === null ? (
              <View style={styles.imageViewStyle} />
            ) : (
              <Image
                resizeMode={'cover'}
                source={{ uri: imageFour?.path }}
                style={styles.imageViewStyle}
              />
            )}
          </View> */}
        </View>
      </Content>
      <BarButton title={'NEXT'} onPress={uploadImage} />
    </ContentContainer>
  );
};

const PageTitle = (): JSX.Element => (
  <>
    <Title title center text={'Please Upload your\nBest Shots!'} />
    <VSpace space={14} />
    <Text
      color={Colors.grapeFruit}
      bold
      text={'You cannot upload face pictures!'}
    />
    <VSpace space={25} />
  </>
);

export default BestShotUpload;
