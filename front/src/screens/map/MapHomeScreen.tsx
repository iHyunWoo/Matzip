import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/queries/useAuth';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";


function MapHomeScreen() {
  const {logoutMutation} = useAuth()
  return (
      <MapView
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
      />
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MapHomeScreen;