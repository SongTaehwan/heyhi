import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  ContentLayer,
  Title,
  BarButton,
  VSpace,
  HSpace,
  Layout,
  IconButton,
} from '@components';
import ImagePicker from 'react-native-image-crop-picker';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';
import { st } from '@constant';
import { getScreenWidth, getScreenHeight } from '@util/Dimensions';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
type BestShotUploadProps = NavigationFlowProps<
  SignUpStackParamList,
  'BestShotUpload'
>;

const imageViewSize = (getScreenWidth() - 60) / 2;
const circleRadiusSize = (getScreenWidth() + getScreenHeight()) / 2;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    color: st.Pallette.grapeFruit,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  imageAddIcon: {
    display: 'flex',
    width: 100,
    height: 100,
    position: 'absolute',
    borderWidth: 1,
    borderColor: st.Pallette.brightSkyBlue,
    borderRadius: circleRadiusSize,
    backgroundColor: st.Pallette.transparent,
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
    borderColor: st.Pallette.veryLightPink,
  },
  textStyle: {
    position: 'absolute',
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: st.Pallette.brightSkyBlue,
    top: imageViewSize + 80,
  },
});

const BestShotUpload = ({ navigation }: BestShotUploadProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [imageThree, setImageThree] = useState();
  const [imageFour, setImageFour] = useState();

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
      const images = await ImagePicker.openPicker({
        multiple: true,
        writeTempFile: true,
        maxFiles: 4,
      });

      console.log('images', images);
      setImageOne(images[0]?.path);
      setImageTwo(images[1]?.path);
      setImageThree(images[2]?.path);
      setImageFour(images[3]?.path);

      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <ContentLayer style={{ paddingHorizontal: 20 }}>
        <Title h2 style={styles.title}>
          {'Please Upload your\nBest Shots!'}
        </Title>
        <VSpace space={14} />
        <Text style={styles.subTitle}>
          {'You cannot upload face pictures!'}
        </Text>
        <VSpace space={25} />
        <View style={styles.imageContainer}>
          {isVisible ? (
            <View>
              <IconButton
                iconSize={30}
                iconName={'plus'}
                iconContainerStyle={styles.imageAddIcon}
                onPress={getImageFromGallery}
              />
              <Text style={styles.textStyle}>Click to add photo</Text>
            </View>
          ) : null}

          <View style={styles.imageLayer}>
            <Image
              resizeMode={'cover'}
              source={{ uri: imageOne }}
              style={styles.imageViewStyle}
            />
            {/* <ImageView style={styles.imageViewStyle} source={imageOne} /> */}
            <HSpace space={20} />
            <Image
              resizeMode={'cover'}
              source={{ uri: imageTwo }}
              style={styles.imageViewStyle}
            />
          </View>
          <VSpace space={20} />
          <View style={styles.imageLayer}>
            <Image
              resizeMode={'cover'}
              source={{ uri: imageThree }}
              style={styles.imageViewStyle}
            />
            <HSpace space={20} />
            <Image
              resizeMode={'cover'}
              source={{ uri: imageFour }}
              style={styles.imageViewStyle}
            />
          </View>
        </View>
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        onPress={(): void => navigation.navigate('SelfieUpload')}
      />
    </Layout>
  );
};

export default BestShotUpload;
