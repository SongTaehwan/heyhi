import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Text,
  Title,
  VSpace,
  Content,
  BarButton,
  IconButton,
  ContentContainer,
  ImageView,
  ErrorMessage,
} from '@components';
import { getRelativeWidth, getCircleRadiusSize } from '@util/Dimensions';
import { LOCAL_SET_SELFIE } from '@api/mutation';
import { logError } from '@util/Error';
import { Colors } from '@constants';
import { SignUpNavigationProps } from '@navigator/Routes';

const styles = StyleSheet.create({
  imageAddIcon: {
    width: getRelativeWidth(130),
    height: getRelativeWidth(130),
    borderWidth: 1,
    borderColor: Colors.veryLightPink,
    borderRadius: getCircleRadiusSize(),
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
  centerlize: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UploadSelfie = ({
  navigation,
}: SignUpNavigationProps<'UploadSelfie'>): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [setSelie] = useMutation(LOCAL_SET_SELFIE, {
    notifyOnNetworkStatusChange: false,
    onCompleted: ({ setSelfie }) => {
      goToInterestSelection();
    },
    onError: logError(setServerErrorMessage),
  });

  useEffect(() => {
    navigation.navigate('SelfieNotice');
  }, []);

  const openCamera = async (): Promise<Image | Image[] | void> => {
    try {
      const image = (await ImagePicker.openCamera({
        width: 400,
        height: 400,
        includeBase64: true,
        cropping: true,
        useFrontCamera: true,
        cropperChooseText: 'Done',
      })) as Image;

      setImageUrl(`data:${image.mime};base64,${image.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const goToInterestSelection = (): void => {
    navigation.navigate('UserInterest');
  };

  const handleOnPressNext = (): void => {
    setSelie({
      variables: {
        thumbnail: imageUrl ?? 'dummy',
      },
    });
  };

  return (
    <ContentContainer>
      <Content>
        <Title title center>
          {'Now, Let’s take a selfie!'}
        </Title>
        <VSpace space={80} />
        <View style={styles.centerlize}>
          {imageUrl !== null ? (
            <TouchableOpacity style={styles.imageAddIcon} onPress={openCamera}>
              <ImageView
                source={{ uri: imageUrl }}
                style={styles.imageAddIcon}
              />
            </TouchableOpacity>
          ) : (
            <IconButton
              size={50}
              color={Colors.brightSkyBlue}
              name={'plus'}
              style={styles.imageAddIcon}
              onPress={openCamera}
            />
          )}
          <VSpace space={30} />
          <Text
            bold
            center
            style={{ lineHeight: 24 }}
            text={'This picture is for the\nother person to recognize you.'}
          />
          <VSpace space={25} />
          <Text
            bold
            center
            color={Colors.grapeFruit}
            text={"We don't judge you by your appearance"}
          />
        </View>
      </Content>
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      <BarButton
        title={'NEXT'}
        // disabled={imageUrl === null}
        onPress={handleOnPressNext}
      />
    </ContentContainer>
  );
};

export default UploadSelfie;
