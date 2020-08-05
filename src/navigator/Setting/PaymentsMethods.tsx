import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import {
  Chip,
  ContentContainer,
  ImageView,
  Title,
  VSpace,
  BarButton,
  HeadDivider,
} from '@components';
// import PaymentImage from '@images/tuto3.png';
import { Grades } from '@constants';

const styles = StyleSheet.create({
  rootWrap: {
    flex: 1,
    width: wp('100%'),
  },
  subWrap: {
    paddingHorizontal: 16,
  },
  image: {
    width: wp('100%'),
    height: hp('50%'),
  },
  textWrap: {
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 15,
    lineHeight: 24,
  },
  priceWrap: {
    flex: 1,
    width: '100%',
    height: 120,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  priceTextWrap: {
    width: 112,
    borderRightWidth: 1,
    paddingRight: 10,
    height: 100,
    justifyContent: 'center',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoWrap: {
    width: 223,
    paddingHorizontal: 20,
  },
  subTerm: {
    fontSize: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
});

const PaymentsMethods = (): JSX.Element => {
  const [selectedPrice, setPrice] = useState({});
  const [priceList, setPriceList] = useState([
    {
      priceText: '$1.99',
      price: 1.99,
      grade: 'basic',
      term: '1 Day',
      subTerm: '24Hrs',
      description: 'One day for One trip',
      selected: false,
      backgroundColor: Grades.basic.backgroundColor,
      borderRightColor: Grades.basic.borderRightColor,
      chipColor: Grades.basic.chipColor,
      selectedTextColor: 'black',
    },
    {
      priceText: '$5.99',
      price: 5.99,
      grade: 'premium',
      term: '7 Days',
      selected: false,
      backgroundColor: Grades.premium.backgroundColor,
      borderRightColor: Grades.premium.borderRightColor,
      chipColor: Grades.premium.chipColor,
    },
    {
      priceText: '$11.99',
      price: 11.99,
      grade: 'vip',
      term: '14 Days',
      selected: false,
      backgroundColor: Grades.vip.backgroundColor,
      borderRightColor: Grades.vip.borderRightColor,
      chipColor: Grades.vip.chipColor,
      selectedTextColor: 'black',
    },
    {
      priceText: '$21.99',
      price: 21.99,
      grade: 'vvip',
      term: '30 Days',
      description: 'Best Value Pack!',
      selected: false,
      backgroundColor: Grades.vvip.backgroundColor,
      borderRightColor: Grades.vvip.borderRightColor,
      chipColor: Grades.vvip.chipColor,
      selectedTextColor: 'black',
    },
  ]);

  const setSelected = (grade: string, price: number): void => {
    setPrice(price);
    setPriceList(
      priceList.map((price) => {
        const selected = price.grade === grade;
        return {
          ...price,
          selected,
          backgroundColor: selected
            ? Grades[`${grade}`].selectedBackgroundColor
            : Grades[`${price.grade}`].backgroundColor,
          borderRightColor: selected
            ? Grades[`${grade}`].selectedWhite
            : Grades[`${price.grade}`].borderRightColor,
          selectedTextColor: selected
            ? Grades[`${grade}`].selectedWhite
            : 'black',
        };
      }),
    );
  };

  return (
    <ContentContainer>
      <HeadDivider />
      <View style={styles.rootWrap}>
        <View>
          <ImageView
            resizeMode={'contain'}
            // source={PaymentImage}
            style={styles.image}
          />
        </View>
        <View style={styles.subWrap}>
          <View style={styles.textWrap}>
            <Title title>Become out member!</Title>
            <VSpace space={20} />
            <Text style={styles.subTitle}>Choose your plan</Text>
            <Text style={styles.subTitle}>
              to make more memories with Hey, Hi
            </Text>
          </View>
        </View>
        <VSpace space={40} />
        <View style={styles.subWrap}>
          {priceList.map((item, i) => (
            <>
              <TouchableOpacity
                key={i}
                style={{
                  ...styles.priceWrap,
                  borderColor: item.backgroundColor,
                  backgroundColor: item.backgroundColor,
                }}
                onPress={(): void => setSelected(item.grade, item.price)}>
                <View
                  style={{
                    ...styles.priceTextWrap,
                    borderRightColor: item.borderRightColor,
                  }}>
                  <Title style={styles.price} color={item.borderRightColor}>
                    {item.priceText}
                  </Title>
                </View>

                <View style={styles.infoWrap}>
                  {item.selected ? (
                    <Chip
                      viewStyle={{
                        width: 223,
                        backgroundColor: Grades[`${item.grade}`].selectedWhite,
                      }}
                      text={'SELECTED!'}
                      color={item.chipColor}
                    />
                  ) : (
                    <Chip text={item.grade} color={item.chipColor} />
                  )}

                  <VSpace space={10} />
                  <Title title color={item.selectedTextColor}>
                    {item.term}{' '}
                    {item.subTerm && (
                      <Text style={styles.subTerm}>({item.subTerm})</Text>
                    )}
                  </Title>
                  <VSpace space={10} />
                  <Text
                    style={{
                      ...styles.description,
                      fontWeight: 'bold',
                      color: item.selectedTextColor,
                    }}>
                    {item?.description}
                  </Text>
                </View>
              </TouchableOpacity>
              <VSpace space={40} />
            </>
          ))}
          <View>
            <Text style={styles.description}>
              Recurring billing, Cancel anytime.
            </Text>
            <Text style={styles.description}>
              This payment will be charged to your iTuens account at
              confirmation of purchase.
            </Text>
            <Text style={styles.description}>
              Your subscription automatically renews unless auto-renew is turned
              off at least 24 hours before the end of current period.
            </Text>
            <VSpace space={30} />
            <Text style={styles.description}>
              If you tapping for “ Continue “, you agree to our Terms of
              Agreement and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>
      <VSpace space={40} />
      <BarButton title="CONTINUE" />
    </ContentContainer>
  );
};

export default PaymentsMethods;
