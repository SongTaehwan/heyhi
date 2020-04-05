import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, StyleSheet } from 'react-native';

import {
  Chip,
  Layout,
  ImageView,
  Title,
  VSpace,
  BarButton,
  HeadDivider,
} from '@components';
import PaymentImage from '@images/tuto3.png';
import { Grades } from '@constant';

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
  const priceList = [
    {
      priceText: '$1.99',
      price: 1.99,
      grade: 'basic',
      term: '1 Day',
      subTerm: '24Hrs',
      description: 'One day for One trip',
    },
    {
      priceText: '$5.99',
      price: 5.99,
      grade: 'premium',
      term: '7 Days',
    },
    {
      priceText: '$11.99',
      price: 11.99,
      grade: 'vip',
      term: '14 Days',
    },
    {
      priceText: '$21.99',
      price: 21.99,
      grade: 'vvip',
      term: '30 Days',
      description: 'Best Value Pack!',
    },
  ];
  return (
    <Layout>
      <HeadDivider />
      <View style={styles.rootWrap}>
        <View>
          <ImageView
            resizeMode={'contain'}
            source={PaymentImage}
            style={styles.image}
          />
        </View>
        <View style={styles.subWrap}>
          <View style={styles.textWrap}>
            <Title h2={true}>Become out member!</Title>
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
              <View
                style={{
                  ...styles.priceWrap,
                  borderColor: Grades[`${item.grade}`].backgroundColor,
                  backgroundColor: Grades[`${item.grade}`].backgroundColor,
                }}>
                <View
                  style={{
                    ...styles.priceTextWrap,
                    borderRightColor: Grades[`${item.grade}`].borderRightColor,
                  }}>
                  <Title style={styles.price}>{item.priceText}</Title>
                </View>

                <View style={styles.infoWrap}>
                  <Chip
                    text={item.grade}
                    color={Grades[`${item.grade}`].chipColor}
                  />

                  <VSpace space={10} />
                  <Title h2={true}>
                    {item.term}{' '}
                    {item.subTerm && (
                      <Text style={styles.subTerm}>({item.subTerm})</Text>
                    )}
                  </Title>
                  <VSpace space={10} />
                  <Text style={{ ...styles.description, fontWeight: 'bold' }}>
                    {item?.description}
                  </Text>
                </View>
              </View>
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
    </Layout>
  );
};

export default PaymentsMethods;
