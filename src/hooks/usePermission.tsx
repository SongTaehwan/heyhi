import { useEffect, useState, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
  requestNotifications,
  request,
  PermissionStatus,
  openSettings,
} from 'react-native-permissions';

type IOSPermission = 'notification';
type AndroidPermission = 'call';

type IOSPermissionState = {
  [key in IOSPermission]: PermissionStatus;
};

type AndroidPermissionState = {
  [key in AndroidPermission]: PermissionStatus;
};

interface UsePermissionProps {
  onCompleted?: () => void;
  onCompletedCheck?: (granted: boolean) => void;
}

const usePermission = (
  props: UsePermissionProps = {},
): [boolean, () => void] => {
  const {
    onCompleted = (): null => null,
    onCompletedCheck = (): null => null,
  } = props;
  const [androidPermission, setAndroidPermission] = useState<
    AndroidPermissionState
  >({} as AndroidPermissionState);
  const [iosPermission, setIosPermission] = useState<IOSPermissionState>(
    {} as IOSPermissionState,
  );

  useEffect(() => {
    const checkPermission = async (): Promise<any> => {
      if (Platform.OS === 'ios') {
        try {
          const result = await checkNotifications().then(
            ({ status }) => status,
          );
          setIosPermission({ notification: result });
          onCompletedCheck(result === RESULTS.GRANTED);
        } catch (error) {
          console.log('iOS Permission Check Error: ', error);
        }
      }

      if (Platform.OS === 'android') {
        try {
          const result = await check(PERMISSIONS.ANDROID.CALL_PHONE).then(
            (status) => status,
          );
          setAndroidPermission({ call: result });
          onCompletedCheck(result === RESULTS.GRANTED);
        } catch (error) {
          console.log('Android Permission Check Error: ', error);
        }
      }
    };

    checkPermission();
  }, []);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      try {
        if (iosPermission.notification === RESULTS.DENIED) {
          await requestNotifications(['alert', 'sound', 'badge']).then(
            ({ status }) => status,
          );

          return onCompleted();
        }

        if (iosPermission.notification === RESULTS.GRANTED) {
          return onCompleted();
        }
      } catch (error) {
        console.log('iOS Permission Request Error: ', error);
      }
    }

    if (Platform.OS === 'android') {
      try {
        if (
          androidPermission.call === RESULTS.DENIED ||
          androidPermission.call === RESULTS.BLOCKED
        ) {
          await request(PERMISSIONS.ANDROID.CALL_PHONE).then(
            (status) => status,
          );

          return onCompleted();
        }

        if (androidPermission.call === RESULTS.GRANTED) {
          return onCompleted();
        }
      } catch (error) {
        console.log('Android Permission Request Error: ', error);
      }
    }

    Alert.alert(
      '설정에서 권한을 승인해주세요.',
      '',
      // '확인을 누르면 설정창으로 이동합니다.',
      [{ text: '확인', onPress: openSettings }],
    );
  }, [iosPermission.notification, androidPermission.call]);

  return [
    iosPermission.notification === RESULTS.GRANTED ||
      androidPermission.call === RESULTS.GRANTED,
    requestPermission,
  ];
};

export default usePermission;
