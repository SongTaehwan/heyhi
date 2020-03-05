import React from 'react';
import { View, Text } from 'react-native';
import { ParagraphStyles } from '@constant/styles';

type ParagraphStyles = 'LargeBody' | 'Body' | 'SmallBody';

type PropTypes = {
  contents: string;
  styleName?: ParagraphStyles;
};

const Paragraph = ({
  contents,
  styleName = 'Body',
}: PropTypes): JSX.Element => {
  return (
    <View>
      <Text style={{ ...ParagraphStyles[styleName] }}>{contents}</Text>
    </View>
  );
};

export default Paragraph;
