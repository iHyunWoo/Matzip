import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {mapNavigations} from '../../constants/navigations.ts';
import {colors} from '../../constants/colors.ts';
import MapHomeScreen from '../../screens/map/MapHomeScreen.tsx';
import AddPostScreen from "../../screens/map/AddPostScreen.tsx";
import {LatLng} from "react-native-maps";

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.WHITE,
        },
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MapStackNavigator;
