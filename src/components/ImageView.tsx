import { StyleSheet, ActivityIndicator } from 'react-native';
import { Image, ImageProps } from 'react-native-elements';
import React from 'react';

const styles = StyleSheet.create({
  default: {
    width: 100,
    height: 60,
  },
  placeholder: {
    backgroundColor: 'transparent',
  },
});

const ImageView = ({
  resizeMode = 'contain',
  source,
  style,
  placeholderStyle,
  PlaceholderContent,
  ...props
}: ImageProps): JSX.Element => {
  const imageViewStyle = style ? style : styles.default;
  const imagePlaceholderStyle = placeholderStyle
    ? placeholderStyle
    : styles.placeholder;

  return (
    <Image
      resizeMode={resizeMode}
      source={source}
      style={imageViewStyle}
      {...props}
      placeholderStyle={imagePlaceholderStyle}
      PlaceholderContent={
        PlaceholderContent ? <ActivityIndicator /> : undefined
      }
    />
  );
};

export default ImageView;
