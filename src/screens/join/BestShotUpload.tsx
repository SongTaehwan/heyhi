import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageSourcePropType } from 'react-native';
import {
  ContentLayer,
  Title,
  BarButton,
  VSpace,
  HSpace,
  Layout,
  ImageView,
  IconButton,
} from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';
import { st } from '@constant';
import { getScreenWidth, getScreenHeight } from '@util/Dimensions';

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
  const [imageOne, setImageOne] = useState<ImageSourcePropType>();
  const [imageTwo, setImageTwo] = useState<ImageSourcePropType>();
  const [imageTree, setImageTree] = useState<ImageSourcePropType>();
  const [imageFour, setImageFour] = useState<ImageSourcePropType>();

  const addButtonHandler = (): void => {
    setIsVisible(false);
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
                onPress={addButtonHandler}
              />
              <Text style={styles.textStyle}>Click to add photo</Text>
            </View>
          ) : null}

          <View style={styles.imageLayer}>
            <ImageView style={styles.imageViewStyle} source={imageOne} />
            <HSpace space={20} />
            <ImageView style={styles.imageViewStyle} source={imageTwo} />
          </View>
          <VSpace space={20} />
          <View style={styles.imageLayer}>
            <ImageView style={styles.imageViewStyle} source={imageTree} />
            <HSpace space={20} />
            <ImageView style={styles.imageViewStyle} source={imageFour} />
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
