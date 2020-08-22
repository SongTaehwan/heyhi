import ImagePicker, {
  Image as PickerImage,
} from 'react-native-image-crop-picker';
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import {
  Text,
  Title,
  VSpace,
  Content,
  ImageView,
  BarButton,
  IconButton,
  ErrorMessage,
  HorizontalView,
  ContentContainer,
} from '@components';
import { getRelativeWidth, getCircleRadiusSize } from '@util/Dimensions';
import { LOCAL_SET_BEST_PICTURES } from '@api/mutation';
import { Colors } from '@constants';
import { logError } from '@util/Error';
import RNFS from 'react-native-fs';
import { SignUpNavigationProps } from '@navigator/Routes';

interface ImageSlot {
  photo: string;
  type: 'PHOTO';
}

const getEmptyImageSlot = (count: number): ImageSlot[] => {
  const slot: ImageSlot = {
    photo: '',
    type: 'PHOTO',
  };

  return Array(count).fill(slot);
};

const getBase64Url = ({
  mime,
  data,
}: {
  mime: string;
  data: string;
}): string => {
  return `data:${mime};base64,${data}`;
};

const convertToImageSlot = (
  result: PickerImage[] | PickerImage,
): ImageSlot[] => {
  const images = result as PickerImage[];
  return images.map(
    (image): ImageSlot => ({
      photo: getBase64Url({ mime: image.mime, data: image.data! }),
      type: 'PHOTO',
    }),
  );
};

const BestShotUpload = ({
  navigation,
}: SignUpNavigationProps<'UploadBestShot'>): JSX.Element => {
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(() =>
    getEmptyImageSlot(4),
  );
  const [isLoading, setLoadng] = useState(false);

  const [setBestShots] = useMutation(LOCAL_SET_BEST_PICTURES, {
    notifyOnNetworkStatusChange: false,
    onCompleted: ({ setBestPictures }) => {
      console.log(setBestPictures);
      goToSelfieUpload();
    },
    onError: logError(setServerErrorMessage),
  });

  const setMultipleImages = (): Promise<ImageSlot[]> => {
    return ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      multiple: true,
      writeTempFile: true,
      maxFiles: imageSlots.length,
    })
      .then(convertToImageSlot)
      .then(resizeImage)
      .then((newSlots): ImageSlot[] => {
        const base64ImageSlots = newSlots as ImageSlot[];
        return imageSlots.map((prevSlot, i) =>
          base64ImageSlots[i] ? base64ImageSlots[i] : prevSlot,
        );
      });
  };

  const setSingleImage = (index: number): Promise<ImageSlot[]> => {
    return ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      writeTempFile: true,
    }).then((newSlot): ImageSlot[] => {
      const { mime, data } = newSlot as PickerImage;
      const imageUrl = getBase64Url({ mime, data: data! });
      const isDulpicated = imageSlots.some(
        (prevSlot) => prevSlot.photo === imageUrl,
      );
      const newImageSlots = imageSlots.slice();

      if (!isDulpicated) {
        newImageSlots[index] = {
          photo: imageUrl,
          type: newImageSlots[index].type,
        };
      }

      return isDulpicated ? imageSlots : newImageSlots;
    });
  };

  const openPhotoLibrary = async (
    slotIndex: number | null = null,
  ): Promise<void> => {
    setLoadng(true);

    try {
      let newImageSlots: ImageSlot[] = [];

      if (slotIndex !== null) {
        newImageSlots = await setSingleImage(slotIndex);
      } else {
        newImageSlots = await setMultipleImages();
        setShowAddButton(false);
      }

      setImageSlots(newImageSlots);
      setLoadng(false);
    } catch (error) {
      console.log(error);
      setLoadng(false);
    }
  };

  // TODO: Upload from client or server?
  const resizeImage = async (
    images: ImageSlot[],
  ): Promise<void | ImageSlot[]> => {
    try {
      const resizedImages: Promise<ImageSlot>[] = [];

      images.forEach(({ photo }) => {
        const resizedImage = ImageResizer.createResizedImage(
          photo,
          600,
          600,
          'JPEG',
          100,
        )
          .then(({ uri }): Promise<string> => RNFS.readFile(uri, 'base64'))
          .then(
            (base64Str): ImageSlot => ({
              photo: getBase64Url({ mime: 'image/png', data: base64Str }),
              type: 'PHOTO',
            }),
          );

        resizedImages.push(resizedImage);
      });

      const result = await Promise.all(resizedImages);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const goToSelfieUpload = (): void => {
    navigation.navigate('UploadSelfie');
  };

  const handleOnPressButton = (): void => {
    const userImages = imageSlots.filter(({ photo }) => photo.length > 0);

    if (userImages.length > 0) {
      setBestShots({
        variables: {
          pics: userImages,
        },
      });
    } else {
      Alert.alert(
        'Alert',
        'Please upload at least one best picture that you took',
      );
    }
  };

  const renderImageBox = (): JSX.Element[] => {
    return imageSlots.map(
      ({ photo }: ImageSlot, i): JSX.Element => {
        return (
          <TouchableOpacity
            key={photo || i}
            onPress={(): Promise<void> => openPhotoLibrary(i)}
            style={styles.imageViewStyle}>
            {photo.length !== 0 ? (
              <ImageView
                resizeMode={'stretch'}
                source={{ uri: photo }}
                style={styles.image}
              />
            ) : (
              <View>{isLoading && <ActivityIndicator size={'large'} />}</View>
            )}
          </TouchableOpacity>
        );
      },
    );
  };

  return (
    <ContentContainer>
      <Content style={{ paddingHorizontal: 0 }}>
        <Title title center text={'Please Upload your\nBest Shots!'} />
        <VSpace space={14} />
        <Text
          color={Colors.grapeFruit}
          bold
          text={'You cannot upload face pictures!'}
        />
        <VSpace space={25} />

        <View style={styles.imageContainer}>
          {showAddButton && <AddPhoto onPress={openPhotoLibrary} />}
          <HorizontalView
            style={styles.imageContentContainer}
            verticalAlign={'center'}
            horizontalAlign={'center'}>
            {renderImageBox()}
          </HorizontalView>
        </View>
        <VSpace space={50} />
      </Content>
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      <BarButton
        title={'NEXT'}
        disabled={isLoading}
        onPress={handleOnPressButton}
      />
    </ContentContainer>
  );
};

const AddPhoto = ({ onPress }: { onPress(): void }): JSX.Element => {
  const handler = (): void => {
    onPress();
  };

  return (
    <View style={styles.imageCoverContainer}>
      <IconButton
        size={50}
        name={'plus'}
        color={Colors.brightSkyBlue}
        style={styles.icon}
        onPress={handler}
      />
      <VSpace space={20} />
      <Text subTitle color={Colors.brightSkyBlue} text={'Click to add photo'} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  imageContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageCoverContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    zIndex: 1,
  },
  icon: {
    width: getRelativeWidth(100),
    height: getRelativeWidth(100),
    borderRadius: getCircleRadiusSize(),
    borderColor: Colors.brightSkyBlue,
    borderWidth: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
  imageViewStyle: {
    width: getRelativeWidth(160),
    height: getRelativeWidth(160),
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.veryLightPink,
    marginBottom: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: getRelativeWidth(160),
    height: getRelativeWidth(160),
    borderRadius: 24,
  },
});

export default BestShotUpload;
