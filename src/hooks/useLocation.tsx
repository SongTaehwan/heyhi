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
      // TODO: add logic of watching position
      try {
        const id = Geolocation.watchPosition(
          (location: GeoPosition) => {
            // callback is not latest version so needs useCallback
            callback(location);
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
      Geolocation.clearWatch(watchId);
    }

    return (): void => {
      Geolocation.clearWatch(watchId);
    };
  }, [shouldTrack, callback]);

  return [err];
};

export default useLocation;
