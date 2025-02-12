import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';
import useAppState from "./useAppState.ts";

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.551603,
    longitude: 126.989862,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {userLocation, isUserLocationError};
}
