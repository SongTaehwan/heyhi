import ImagePicker, {
  Image as PickerImage,
} from 'react-native-image-crop-picker';
import ImageResizer, {
  Response as ResizingResponse,
} from 'react-native-image-resizer';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Config from 'react-native-config';
import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import {
  Text,
  Title,
  VSpace,
  Content,
  BarButton,
  IconButton,
  HorizontalView,
  ContentContainer,
  ImageView,
} from '@components';
import { Screens, SignUpStackNavigationProps } from '@navigation/types';
import { getRelativeWidth, getCircleRadiusSize } from '@util/Dimensions';
import AWS from '../../../aws.config';
import { Colors } from '@constants';

interface BestShotUploadProps {
  navigation: SignUpStackNavigationProps<Screens.BestShotUpload>;
}

interface ImageSlot {
  filename: string;
  path: string;
}

const BUTKET_URL = Config.BUCKET_PATH + '/BACKGROUND';

const getEmptyImageSlot = (count: number): ImageSlot[] => {
  const slot: ImageSlot = {
    filename: '',
    path: '',
  };

  return Array(count).fill(slot);
};

const BestShotUpload = ({ navigation }: BestShotUploadProps): JSX.Element => {
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(() =>
    getEmptyImageSlot(4),
  );
  const [isLoading, setLoadng] = useState(false);

  const convertToImageSlot = (
    result: PickerImage[] | PickerImage,
  ): ImageSlot[] => {
    const images = result as PickerImage[];
    return images.map(
      ({ filename, path }): ImageSlot => ({
        filename,
        path,
      }),
    );
  };

  const setMultipleImages = (): Promise<ImageSlot[]> => {
    return ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      writeTempFile: true,
      maxFiles: imageSlots.length,
    })
      .then(convertToImageSlot)
      .then((newSlots): ImageSlot[] => {
        return imageSlots.map((prevSlot, i) =>
          newSlots[i] ? newSlots[i] : prevSlot,
        );
      });
  };

  const setSingleImage = (index: number): Promise<ImageSlot[]> => {
    return ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
    }).then((newSlot): ImageSlot[] => {
      const { filename, path } = newSlot as PickerImage;
      const isDulpicated = imageSlots.some(
        (prevSlot) => prevSlot.filename === filename,
      );
      const newImageSlots = imageSlots.slice();

      if (!isDulpicated) {
        newImageSlots[index] = {
          filename,
          path,
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
    imagePath: string[],
  ): Promise<void | ResizingResponse[]> => {
    try {
      const resizedImages: Promise<ResizingResponse>[] = [];

      imagePath.forEach((path) => {
        const resizedImage = ImageResizer.createResizedImage(
          path,
          1000,
          1000,
          'JPEG',
          100,
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
    navigation.navigate(Screens.SelfieUpload);
  };

  const renderImageBox = (): JSX.Element[] => {
    return imageSlots.map(
      ({ path }: ImageSlot, i): JSX.Element => {
        return (
          <TouchableOpacity
            key={path || i}
            onPress={(): Promise<void> => openPhotoLibrary(i)}
            style={styles.imageViewStyle}>
            {path.length !== 0 ? (
              <ImageView
                resizeMode={'stretch'}
                source={{ uri: path }}
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
        <PageTitle />

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
      <BarButton
        title={'NEXT'}
        disabled={isLoading}
        onPress={goToSelfieUpload}
        // onPress={(): Promise<void> =>
        //   resizeImage(
        //     imageSlots.filter(({ path }) => !!path).map(({ path }) => path),
        //   )
        // }
      />
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
