import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ContentLayer, Title, BarButton, VSpace, Layout } from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';
import { st } from '@constant';

type BestShotUploadProps = NavigationFlowProps<
  SignUpStackParamList,
  'BestShotUpload'
>;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    color: st.Pallette.grapeFruit,
    fontWeight: 'bold',
  },
});

const BestShotUpload = ({ navigation }: BestShotUploadProps): JSX.Element => {
  return (
    <Layout>
      <ContentLayer>
        <Title h2 style={styles.title}>
          {'Please Upload your\nBest Shots!'}
        </Title>
        <VSpace space={14} />
        <Text style={styles.subTitle}>
          {'You cannot upload face pictures!'}
        </Text>
        <VSpace space={25} />
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        onPress={(): void => navigation.navigate('SelfieUpload')}
      />
    </Layout>
  );
};

export default BestShotUpload;
