import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useState, useEffect } from 'react';

const useLocation = (
  shouldTrack: boolean,
  callback: (location: GeoPosition) => void,
): [string] => {
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    let watchId = 0;

    const startWatching = (): void => {
      console.log('called');
      // TODO: add logic of watching position
      try {
        const id = Geolocation.watchPosition(
          (location: GeoPosition) => {
            // callback is not latest version so needs useCallback
            callback(location);
            console.log('update location');
          },
          (error) => {
            console.log('error: ', error);
            setErr(error.message);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 1,
            interval: 1000,
            fastestInterval: 500,
          },
        );

        watchId = id;
      } catch (error) {
        setErr(error);
      }
    };

    if (shouldTrack) {
      startWatching();
    }

    if (!shouldTrack && watchId !== null) {
      console.log('else');
      Geolocation.clearWatch(watchId);
    }

    return (): void => {
      console.log('clear up hook');
      Geolocation.clearWatch(watchId);
    };
  }, [shouldTrack, callback]);

  return [err];
};

export default useLocation;
