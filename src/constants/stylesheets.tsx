import { StackHeaderLeftButtonProps } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TextSheetType,
  ContainerSheetType,
  HeaderSheetType,
  StyleSheetsType,
  Header,
} from '@type';
import { BackButton, SkipButton } from '@components';
import Colors from './colors';

// NOTE: Text Sheets
const textSheetCreator = <P extends TextSheetType<keyof P>>(sheets: P): P =>
  sheets;

const textSheets = textSheetCreator({
  title: (color = Colors.black, align = 'auto') => ({
    fontSize: 24,
    lineHeight: 29,
    color,
    fontWeight: 'bold',
    textAlign: align,
  }),
  subTitle: (bold = false, color = Colors.black, align = 'auto') => {
    return {
      fontSize: 18,
      lineHeight: 30,
      color: Colors.black,
      fontWeight: bold ? 'bold' : 'normal',
      textAlign: align,
    };
  },
  headerTitle: (bold = false) => ({
    fontSize: 18,
    color: Colors.darkSlateBlue,
    fontWeight: bold ? 'bold' : 'normal',
  }),
  buttonTitle: (size = 'small') => {
    return {
      fontSize: size === 'small' ? 15 : 24,
      lineHeight: size === 'small' ? 30 : 29,
      fontWeight: size === 'small' ? 'normal' : 'bold',
      color: Colors.white,
    };
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  baseText(color = Colors.black, bold = false, lineHeight) {
    return {
      fontSize: 15,
      lineHeight,
      color,
      fontWeight: bold ? 'bold' : 'normal',
    };
  },
  smallText(color = Colors.veryLightPink, lineHeight) {
    return {
      fontSize: 13,
      lineHeight,
      color,
    };
  },
});

// NOTE: Container Sheets
const containerSheet: ContainerSheetType = {
  default: {
    flex: 1,
    backgroundColor: 'white',
  },
  topless: {
    paddingTop: 0,
  },
  bottomless: {
    paddingBottom: 0,
  },
};

// NOTE: Header Sheets
const headerless: Header = {
  headerStyle: { shadowOffset: { height: 0, width: 0 }, elevation: 0 },
  title: '',
};

const headerLeftBackButtonConfig = {
  headerLeft(props: StackHeaderLeftButtonProps): React.ReactNode {
    const canGoBack = props.canGoBack ?? true;

    if (canGoBack) {
      return <BackButton canGoBack={canGoBack} />;
    }
  },
};

const headerSheets: HeaderSheetType = {
  headerless,
  headerLeftBackButtonConfig,
  tutorialHeader: {
    ...headerless,
    ...headerLeftBackButtonConfig,
    headerRightContainerStyle: {
      paddingVertical: 10,
      paddingRight: 20,
    },
    headerRight(props: StackHeaderLeftButtonProps): React.ReactNode {
      return <SkipButton {...props} />;
    },
  },
  withBackButton: {
    ...headerless,
    ...headerLeftBackButtonConfig,
  },
};

// NOTE: StyleSheets
const StyleSheets: StyleSheetsType = {
  container: containerSheet,
  text: textSheets,
  header: headerSheets,
  setAlignment(
    flexDirection = 'row',
    justifyContent = 'flex-start',
    alignItems = 'flex-start',
    flexWrap = 'nowrap',
    direction = 'ltr',
  ) {
    return {
      flexDirection,
      justifyContent,
      alignItems,
      flexWrap,
      direction,
    };
  },
  setPadding(top = 0, bottom = 0, left = 0, right = 0) {
    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    };
  },
  setMargin(top = 0, bottom = 0, left = 0, right = 0) {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  },
  setDimension(width = 0, height = 0) {
    const isWidthPercentage = typeof width === 'string';
    const isHeightPercentage = typeof height === 'string';

    return {
      width: isWidthPercentage ? wp(width) : (width as number),
      height: isHeightPercentage ? hp(height) : (height as number),
    };
  },
};

export default StyleSheets;
