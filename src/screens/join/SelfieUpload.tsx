import ImagePicker, { Image } from 'react-native-image-crop-picker';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Text,
  Title,
  VSpace,
  Content,
  BarButton,
  IconButton,
  ContentContainer,
  ImageView,
} from '@components';
import { getRelativeWidth, getCircleRadiusSize } from '@util/Dimensions';
import { Screens, SignUpStackNavigationProps } from '@navigation/types';
import { Colors } from '@constants';

interface SelfieUploadProps {
  navigation: SignUpStackNavigationProps<'SelfieUpload'>;
}

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

const SelfieUpload = ({ navigation }: SelfieUploadProps): JSX.Element => {
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    navigation.navigate(Screens.SelfieNotice);
  }, []);

  const openCamera = async (): Promise<Image | Image[] | void> => {
    try {
      const image = (await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        useFrontCamera: true,
        cropperChooseText: 'Done',
      })) as Image;

      setImagePath(image.path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContentContainer>
      <Content>
        <Title title center>
          {'Now, Let’s take a selfie!'}
        </Title>
        <VSpace space={80} />
        <View style={styles.centerlize}>
          {imagePath !== null ? (
            <TouchableOpacity style={styles.imageAddIcon} onPress={openCamera}>
              <ImageView
                source={{ uri: imagePath }}
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
      <BarButton
        title={'NEXT'}
        disabled={imagePath === null}
        onPress={(): void => navigation.navigate(Screens.InterestSelection)}
      />
    </ContentContainer>
  );
};

export default SelfieUpload;
