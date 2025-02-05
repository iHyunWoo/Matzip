import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/queries/useAuth';


function MapHomeScreen() {
  const {logoutMutation} = useAuth()
  return (
    <View>
      <Text>맵 스크린</Text>
      <CustomButton label='로그아웃' onPress={() => logoutMutation.mutate(null)}/>
    </View>
)
}

const styles = StyleSheet.create({});

export default MapHomeScreen;