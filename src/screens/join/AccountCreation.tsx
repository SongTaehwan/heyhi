import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ContentLayer,
  Title,
  BarButton,
  TextField,
  VSpace,
  HSpace,
  Layout,
  Picker,
} from '@components';
import useText from '@hooks/useText';
import { SignUpFlowProps, Screens } from '@routes/types';
import { DatePicker, WheelPicker } from 'react-native-wheel-picker-android';
import moment from 'moment';

type AccountCreationProps = SignUpFlowProps<Screens.AccountCreation>;

const styles = StyleSheet.create({
  nameFieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameFieldStyle: {
    paddingHorizontal: 0,
    flex: 1,
  },
  pickerContainer: {
    // TODO: cause android crash
    // backgroundColor: 'white',
  },
});

const genders = ['Male', 'Female'];
const countries = ['Republic of Korea'];

const AccountCreation = ({ navigation }: AccountCreationProps): JSX.Element => {
  const [genderState, setGender] = useState('');
  const [birthCountry, setCountry] = useState('');
  const [birthDate, setBirthDate] = useState(() => new Date());

  const handleOnChangeDate = (newDate: Date): void => {
    setBirthDate(newDate);
  };

  const handleOnChangeGender = (index: number): void => {
    setGender(genders[index]);
  };

  const [email, setEmail] = useText('', { isEmail: true });

  return (
    <Layout>
      <ContentLayer>
        <Title h2>{'Making Account'}</Title>
        <VSpace space={30} />
        <TextField placeholder={'Email'} onChangeText={setEmail} />
        <VSpace space={10} />
        <TextField placeholder={'Password'} />
        <VSpace space={10} />
        <TextField placeholder={'Password Confirm'} />
        <VSpace space={10} />
        <View style={styles.nameFieldWrapper}>
          <TextField
            containerStyle={styles.nameFieldStyle}
            placeholder={'Given Name'}
          />
          <HSpace />
          <TextField
            containerStyle={styles.nameFieldStyle}
            placeholder={'Family Name'}
          />
        </View>
        <VSpace space={10} />
        <Picker value={birthCountry} placeholder={'Nationality'}>
          <WheelPicker
            selectedItem={countries.findIndex((v) => v === birthCountry)}
            data={countries}
            style={styles.pickerContainer}
            // onItemSelected={onChangeValue}
          />
        </Picker>
        <VSpace space={10} />
        <Picker
          value={moment(birthDate).format('YYYY.MM.DD')}
          placeholder={'Birth Date'}>
          <DatePicker
            date={birthDate}
            mode={'date'}
            initDate={birthDate}
            onDateChange={handleOnChangeDate}
          />
        </Picker>
        <VSpace space={10} />
        <Picker
          value={genderState}
          placeholder={'Gender'}
          data={genders}
          onChangeValue={handleOnChangeGender}>
          <WheelPicker
            selectedItem={genders.findIndex((v) => v === genderState)}
            data={genders}
            style={styles.pickerContainer}
          />
        </Picker>
      </ContentLayer>
      <BarButton
        title={'NEXT'}
        onPress={(): void =>
          navigation.navigate(Screens.EmailVerification, {
            email,
          })
        }
      />
    </Layout>
  );
};

export default AccountCreation;
