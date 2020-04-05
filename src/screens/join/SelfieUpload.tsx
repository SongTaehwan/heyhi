import React from 'react';
import { View, Text } from 'react-native';
import { Layout, ContentLayer, Title, BarButton } from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';

type SelfieUploadProps = NavigationFlowProps<
  SignUpStackParamList,
  'SelfieUpload'
>;

const SelfieUpload = ({ navigation }: SelfieUploadProps): JSX.Element => {
  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Now, Let’s take a selfie!'}</Title>
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        onPress={(): void => navigation.navigate('ServicePolicy')}
      />
    </Layout>
  );
};

export default SelfieUpload;
