import React from 'react';
import { View, Text } from 'react-native';
import { Content, Title, BarButton, ContentContainer } from '@components';

const LanguageSelect = (): JSX.Element => {
  return (
    <ContentContainer>
      <Content>
        <Title title>{'Language'}</Title>
      </Content>
      <BarButton />
    </ContentContainer>
  );
};

export default LanguageSelect;
