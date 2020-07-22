import { View, StyleSheet, Platform, Keyboard } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import DatePicker from 'react-native-date-picker';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useRef } from 'react';
import { Input } from 'react-native-elements';
import moment from 'moment';
import {
  Title,
  VSpace,
  HSpace,
  Picker,
  Content,
  BarButton,
  TextField,
  ErrorMessage,
  HorizontalView,
  ContentContainer,
} from '@components';
import { SignUpStackNavigationProps, Screens } from '@navigation/types';
import { LOCAL_SET_PERSONAL_INFO } from '@api/mutation/local';
import { Countries, Colors } from '@constants';
import useText from '@hooks/useText';
import { logError } from '@util/Error';

interface AccountCreationProps {
  navigation: SignUpStackNavigationProps<Screens.AccountCreation>;
}

enum FORM_DATA_TYPE {
  EMAIL = 'Email',
  PASSWORD = 'Password',
  PASSWORD_CONFIRM = 'Password Confirm',
  FIRST_NAME = 'First Name',
  SECOND_NAME = 'Second Name',
  COUNTRY = 'Nationality',
  BIRTH_DATE = 'Birth Date',
  GENDER = 'Gender',
}

enum MSG {
  EMAIL = 'Correct email format required',
  PASSWORD = 'Password is not confirmed',
  NAME = 'Not valid name',
  COUNTRY = 'Choose your birth country',
  BIRTH_DATE = 'Choose your birth date',
  GENDER = 'Choose your gender',
}

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
    ...Platform.select({
      android: {
        height: 120,
      },
    }),
  },
});

const GENDERS = ['Choose your Gender', 'Male', 'Female'];
Countries.unshift('Choose your country');

const initialErrorState = {
  message: '',
  fromEmail: false,
  fromPassword: false,
  fromName: false,
};

const AccountCreation = ({ navigation }: AccountCreationProps): JSX.Element => {
  const [email, setEmail, isValidEmail] = useText('xoghks167@naver.com', {
    isEmail: true,
  });
  const [lastName, setSecondName] = useText('송');
  const [firstName, setFirstName] = useText('태환');
  const [password, setPassword] = useText('123123');
  const [birthDate, setBirthDate] = useState<Date>(() => new Date());
  const [birthCountry, setCountry] = useState('South Korea');
  const [gender, setGender] = useState('Male');

  const [passwordConfirmed, setPasswordEquality] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [error, setError] = useState(initialErrorState);
  const inputRefs = useRef<{ ref: Input; id: any }[]>([]);

  const [setPersonalInfo, { loading }] = useMutation(LOCAL_SET_PERSONAL_INFO, {
    notifyOnNetworkStatusChange: false,
    onCompleted: ({ setPersonalInfo: personalInfo }) => {
      console.log(personalInfo);
      goToEmailVerification();
    },
    onError: logError(setServerErrorMessage),
  });

  const setRefs = (node: Input, id: any): void => {
    if (node) {
      inputRefs.current.push({ ref: node, id });
    }
  };

  const handleOnSelectNationality = (index: number): void => {
    if (index === 0) return;
    setCountry(Countries[index]);
  };

  const handleOnChangeDate = (newDate: Date): void => {
    setBirthDate(newDate);
  };

  const handleOnSelectGender = (index: number): void => {
    if (index === 0) return;
    setGender(GENDERS[index]);
  };

  const goToEmailVerification = (): void => {
    navigation.navigate(Screens.EmailVerification, {
      email,
    });
  };

  const confirmPassword = (comparison: string): void => {
    if (password === comparison) {
      return setPasswordEquality(true);
    }

    setPasswordEquality(false);
  };

  const getTargetRef = (targetId: FORM_DATA_TYPE): Input | null => {
    return (
      inputRefs.current.filter(({ id }) => id === targetId).pop()?.ref ?? null
    );
  };

  const shakeInput = (targetId: FORM_DATA_TYPE): void => {
    const targetRef = getTargetRef(targetId);

    if (targetRef !== null) {
      targetRef.shake();
    }
  };

  const focusInput = (targetId: FORM_DATA_TYPE): void => {
    const targetRef = getTargetRef(targetId);

    if (targetRef !== null) {
      targetRef.focus();
    }
  };

  const validateEmail = (): boolean => {
    if (!isValidEmail) {
      setError({
        message: MSG.EMAIL,
        fromEmail: true,
        fromPassword: false,
        fromName: false,
      });

      shakeInput(FORM_DATA_TYPE.EMAIL);
      return false;
    }

    return true;
  };

  const validatePwConfirm = (): boolean => {
    if (!passwordConfirmed) {
      setError({
        message: MSG.PASSWORD,
        fromEmail: false,
        fromPassword: true,
        fromName: false,
      });

      shakeInput(FORM_DATA_TYPE.PASSWORD_CONFIRM);
      return false;
    }

    return true;
  };

  const validateName = (): boolean => {
    const nameValidationExp = new RegExp(/^[가-힣a-zA-Z]/);

    if (
      !nameValidationExp.exec(firstName) ||
      !nameValidationExp.exec(lastName)
    ) {
      setError({
        message: MSG.NAME,
        fromEmail: false,
        fromPassword: false,
        fromName: true,
      });

      shakeInput(FORM_DATA_TYPE.FIRST_NAME);
      shakeInput(FORM_DATA_TYPE.SECOND_NAME);
      return false;
    }

    return true;
  };

  const validateCountry = (): boolean => {
    if (birthCountry.length === 0) {
      setError({
        ...initialErrorState,
        message: MSG.COUNTRY,
      });
      return false;
    }

    return true;
  };

  const validateGender = (): boolean => {
    if (gender.length === 0) {
      setError({ ...initialErrorState, message: MSG.GENDER });
      return false;
    }

    setError(initialErrorState);

    return true;
  };

  const isFormDataValid = (): boolean => {
    if (!validateEmail()) return false;
    if (!validatePwConfirm()) return false;
    if (!validateName()) return false;
    if (!validateCountry()) return false;
    if (!validateGender()) return false;

    return true;
  };

  const onSubmitSignUp = (): void => {
    const isValid = isFormDataValid();

    if (isValid) {
      setPersonalInfo({
        variables: {
          user: {
            firstName,
            lastName,
            gender,
            nationality: birthCountry,
            password,
            birthDate,
          },
        },
      });
    }
  };

  return (
    <ContentContainer>
      <Content>
        <Title title text={'Making Account'} center />
        <VSpace space={30} />
        <TextField
          autoFocus
          enablesReturnKeyAutomatically
          refId={FORM_DATA_TYPE.EMAIL}
          customRef={setRefs}
          hasError={error.fromEmail}
          placeholder={FORM_DATA_TYPE.EMAIL}
          onChangeText={setEmail}
          returnKeyType={'next'}
          onSubmitEditing={(): void => focusInput(FORM_DATA_TYPE.PASSWORD)}
        />
        <VSpace space={10} />
        <TextField
          enablesReturnKeyAutomatically
          refId={FORM_DATA_TYPE.PASSWORD}
          customRef={setRefs}
          hasError={error.fromPassword}
          maxLength={15}
          secureTextEntry
          placeholder={FORM_DATA_TYPE.PASSWORD}
          onChangeText={setPassword}
          returnKeyType={'next'}
          onSubmitEditing={(): void =>
            focusInput(FORM_DATA_TYPE.PASSWORD_CONFIRM)
          }
        />
        <VSpace space={10} />
        <TextField
          enablesReturnKeyAutomatically
          refId={FORM_DATA_TYPE.PASSWORD_CONFIRM}
          customRef={setRefs}
          hasError={error.fromPassword}
          maxLength={15}
          secureTextEntry
          placeholder={FORM_DATA_TYPE.PASSWORD_CONFIRM}
          onChangeText={confirmPassword}
          returnKeyType={'next'}
          onSubmitEditing={(): void => focusInput(FORM_DATA_TYPE.FIRST_NAME)}
        />
        <VSpace space={10} />
        <HorizontalView horizontalAlign={'space-between'}>
          <TextField
            enablesReturnKeyAutomatically
            refId={FORM_DATA_TYPE.FIRST_NAME}
            customRef={setRefs}
            hasError={error.fromName}
            maxLength={10}
            containerStyle={styles.nameFieldStyle}
            placeholder={FORM_DATA_TYPE.FIRST_NAME}
            autoCapitalize={'words'}
            onChangeText={setFirstName}
            returnKeyType={'next'}
            onSubmitEditing={(): void => focusInput(FORM_DATA_TYPE.SECOND_NAME)}
          />
          <HSpace />
          <TextField
            enablesReturnKeyAutomatically
            refId={FORM_DATA_TYPE.SECOND_NAME}
            customRef={setRefs}
            hasError={error.fromName}
            maxLength={10}
            containerStyle={styles.nameFieldStyle}
            placeholder={FORM_DATA_TYPE.SECOND_NAME}
            autoCapitalize={'words'}
            onChangeText={setSecondName}
            returnKeyType={'done'}
            onSubmitEditing={Keyboard.dismiss}
          />
        </HorizontalView>
        <VSpace space={10} />
        <Picker value={birthCountry} placeholder={FORM_DATA_TYPE.COUNTRY}>
          <WheelPicker
            indicatorColor={Colors.veryLightPink}
            selectedItem={Countries.findIndex((v) => v === birthCountry)}
            data={Countries}
            style={styles.pickerContainer}
            onItemSelected={handleOnSelectNationality}
          />
        </Picker>
        <VSpace space={10} />
        <Picker value={moment(birthDate).format('YYYY.MM.DD')}>
          <View style={{ alignItems: 'center' }}>
            <DatePicker
              date={birthDate}
              mode={'date'}
              onDateChange={handleOnChangeDate}
            />
          </View>
        </Picker>
        <VSpace space={10} />
        <Picker
          value={gender}
          placeholder={FORM_DATA_TYPE.GENDER}
          data={GENDERS}>
          <WheelPicker
            indicatorColor={Colors.veryLightPink}
            selectedItem={GENDERS.findIndex((v) => v === gender)}
            data={GENDERS}
            style={styles.pickerContainer}
            onItemSelected={handleOnSelectGender}
          />
        </Picker>
      </Content>
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      {!!error.message && <ErrorMessage message={error.message} />}
      <BarButton
        loading={loading}
        disabled={loading}
        title={'NEXT'}
        onPress={onSubmitSignUp}
        // onPress={() => navigation.navigate('EmailVerification', { email: 123 })}
      />
    </ContentContainer>
  );
};

export default AccountCreation;
