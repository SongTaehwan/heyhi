import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ContentLayer,
  Title,
  BarButton,
  Layout,
  Checkbox,
  VSpace,
  Divider,
  CheckableListItem,
} from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';

type ServicePolicyProps = NavigationFlowProps<
  SignUpStackParamList,
  'ServicePolicy'
>;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    width: '100%',
  },
  contentLayer: {
    paddingHorizontal: 30,
    alignItems: 'flex-start',
  },
  divider: {
    marginTop: 20,
    marginBottom: 30,
  },
  checkboxListItemWrapper: {
    alignItems: 'flex-start',
  },
});

const ServicePolicy = ({ navigation }: ServicePolicyProps): JSX.Element => {
  return (
    <Layout>
      <ContentLayer style={styles.contentLayer}>
        <Title h2 style={styles.title}>
          {'Terms & Conditions'}
        </Title>
        <VSpace space={30} />
        <CheckableListItem />
        <Divider style={styles.divider} />
        <Checkbox
          large
          title="I consent to the collection and use
my personal information.
(including location information)"
          wrapperStyle={styles.checkboxListItemWrapper}
        />
        <VSpace space={40} />
        <CheckableListItem />
        <VSpace space={40} />
        <CheckableListItem />
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        onPress={(): void => navigation.navigate('EmailVerification')}
      />
    </Layout>
  );
};

export default ServicePolicy;
