import React from 'react';
import { View, Text } from 'react-native';
import { ContentLayer, Title, BarButton, Layout } from '@components';

const LanguageSelect = (): JSX.Element => {
  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Language'}</Title>
      </ContentLayer>
      <BarButton />
    </Layout>
  );
};

export default LanguageSelect;
