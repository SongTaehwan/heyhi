import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Content,
  Title,
  BarButton,
  ContentContainer,
  VSpace,
  Divider,
  CheckableListItem,
  Text,
} from '@components';
import {
  NavigationFlowProps,
  SignUpStackParamList,
  Screens,
} from '@routes/types';

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
    // Store policy agreement
    navigation.navigate(Screens.ServicePolicyDetail);
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text={'Terms & Conditions'} />
        <VSpace space={30} />
        <CheckableListItem
          showCheckbox={false}
          verticalAlign={'center'}
          onPressTextButton={goToConditionDetail}>
          <CheckableListItem.Checkbox
            value={CheckValue.all}
            large
            checked={checkList.all}
            onPress={handleOnCheckAll}
          />
          <Text subTitle bold text={'I consent to all of the below'} />
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
      </Content>
      <BarButton
        title={'NEXT'}
        disabled={
          !checkList.location ||
          !checkList.personalInfo ||
          !checkList.servicePolicy
        }
        onPress={(): void => navigation.navigate(Screens.BestShotUpload)}
      />
    </ContentContainer>
  );
};

export default ServicePolicy;
