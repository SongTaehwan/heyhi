import { TextStyle, FlexStyle, FlexAlignType } from 'react-native';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

// NOTE: Common type
export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
export type FlexDirections =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';
export type FlexWraps = 'nowrap' | 'wrap' | 'wrap-reverse';
export type Direction = 'inherit' | 'ltr' | 'rtl';
export type FlexAxis =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type PaddingProperties = {
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
};

export type MarginProperties = {
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
};

export type StyleSheetsType = {
  text: TextSheetType<
    | 'headerTitle'
    | 'buttonTitle'
    | 'baseText'
    | 'smallText'
    | 'title'
    | 'subTitle'
    | 'nameText'
  >;
  container: ContainerSheetType;
  header: HeaderSheetType;
  setAlignment(
    flexDirection?: FlexDirections,
    justifyContent?: FlexAxis,
    alignItems?: FlexAlignType,
    flexWrap?: FlexWraps,
    direction?: Direction,
  ): FlexStyle;
  setPadding(
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
  ): PaddingProperties;
  setMargin(
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
  ): MarginProperties;
  setDimension(
    width?: number | string,
    height?: number | string,
  ): {
    width: number;
    height: number;
  };
};

// NOTE: Heper
export interface SheetHelpers {
  title(color?: Colors, align?: TextAlign): TextStyle;
  subTitle(bold?: boolean, align?: TextAlign): TextStyle;
  headerTitle(bold?: boolean): TextStyle;
  buttonTitle(size?: 'small' | 'large'): TextStyle;
  baseText(color?: Colors, bold?: boolean, lineHeight?: number): TextStyle;
  smallText(color?: Colors, lineHeight?: number): TextStyle;
}

// NOTE: Sheet Types
export type TextSheetType<K extends keyof any> = SheetHelpers &
  Record<Exclude<K, keyof SheetHelpers>, TextStyle>;

export type ContainerSheetType = { [key: string]: TextStyle };

export interface Header extends StackHeaderOptions {
  title: string;
}

export type HeaderSheetType = {
  headerless: Header;
  tutorialHeader: Header;
  withBackButton: Header;
};
