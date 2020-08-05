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
import { Screens, SignUpStackNavigationProps } from '@navigator/types';

interface ServicePolicyProps {
  navigation: SignUpStackNavigationProps<Screens.ServicePolicy>;
}

enum Policies {
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

  const handleOnCheckCondition = (value: Policies): void => {
    setCheckList((prev) => {
      const targetKey = value;
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

  const goToBestShotUpload = (): void => {
    navigation.navigate(Screens.BestShotUpload);
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
            value={Policies.all}
            large
            checked={checkList.all}
            onPress={handleOnCheckAll}
          />
          <Text subTitle bold text={'I consent to all of the below'} />
        </CheckableListItem>
        <Divider style={styles.divider} />

        <CheckableListItem
          value={Policies.personalInfo}
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
          value={Policies.location}
          checked={checkList.all || checkList.location}
          onPressCheckbox={handleOnCheckCondition}>
          <CheckableListItem.ListItem
            title={'I consent to the location - based\nservices terms.'}
            onPress={goToConditionDetail}
          />
        </CheckableListItem>
        <VSpace space={40} />

        <CheckableListItem
          value={Policies.servicePolicy}
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
        onPress={goToBestShotUpload}
      />
    </ContentContainer>
  );
};

export default ServicePolicy;
