import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ContentLayer,
  Title,
  BarButton,
  Layout,
  VSpace,
  Divider,
  CheckableListItem,
  Text,
} from '@components';
import { NavigationFlowProps, SignUpStackParamList } from '@routes/types';

type ServicePolicyProps = NavigationFlowProps<
  SignUpStackParamList,
  'ServicePolicy'
>;

enum CheckValue {
  personalInfo = 'personalInfo',
  location = 'location',
  servicePolicy = 'servicePolicy',
  all = 'all',
}

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

const initialState = {
  all: false,
  personalInfo: false,
  location: false,
  servicePolicy: false,
};

const ServicePolicy = ({ navigation }: ServicePolicyProps): JSX.Element => {
  const [checkList, setCheckList] = useState(initialState);

  const handleOnCheckAll = (): void => {
    setCheckList((prev) => ({
      all: !prev.all,
      personalInfo: !prev.all,
      location: !prev.all,
      servicePolicy: !prev.all,
    }));
  };

  const handleOnCheckCondition = (value: string): void => {
    setCheckList((prev) => {
      const targetKey = value as CheckValue;
      const prevValue = prev[targetKey];

      return {
        ...prev,
        all: false,
        [targetKey]: !prevValue,
      };
    });
  };

  const goToConditionDetail = (): void => {
    navigation.navigate('ServicePolicyDetail');
  };

  return (
    <Layout>
      <ContentLayer style={styles.contentLayer}>
        <Title h2 style={styles.title}>
          {'Terms & Conditions'}
        </Title>
        <VSpace space={30} />
        <CheckableListItem
          showCheckbox={false}
          onPressTextButton={goToConditionDetail}>
          <CheckableListItem.Checkbox
            value={CheckValue.all}
            large
            checked={checkList.all}
            onPress={handleOnCheckAll}
          />
          <Text h3 title={'I consent to all of the below'} />
        </CheckableListItem>
        <Divider style={styles.divider} />
        <CheckableListItem
          value={CheckValue.personalInfo}
          checked={checkList.all || checkList.personalInfo}
          onPressCheckbox={handleOnCheckCondition}>
          <CheckableListItem.ListItem
            title={
              'I consent to the collection and use\nmy personal information.\n(including location information)'
            }
            onPress={goToConditionDetail}
          />
        </CheckableListItem>
        <VSpace space={40} />
        <CheckableListItem
          value={CheckValue.location}
          checked={checkList.all || checkList.location}
          onPressCheckbox={handleOnCheckCondition}>
          <CheckableListItem.ListItem
            title={'I consent to the location - based\nservices terms.'}
            onPress={goToConditionDetail}
          />
        </CheckableListItem>
        <VSpace space={40} />
        <CheckableListItem
          value={CheckValue.servicePolicy}
          checked={checkList.all || checkList.servicePolicy}
          onPressCheckbox={handleOnCheckCondition}>
          <CheckableListItem.ListItem
            title={'I consent to Terms and Conditions.'}
            onPress={goToConditionDetail}
          />
        </CheckableListItem>
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        disabled={
          !checkList.location ||
          !checkList.personalInfo ||
          !checkList.servicePolicy
        }
        onPress={(): void => navigation.navigate('BestShotUpload')}
      />
    </Layout>
  );
};

export default ServicePolicy;
