import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from './HeaderButton.tsx';
import Ionicons from '@react-native-vector-icons/ionicons';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../navigations/drawer/MainDrawerNavigator.tsx';
import {FeedStackParamList} from '../navigations/stack/FeedStackNavigator.tsx';

type FeedHomeHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedHomeHeaderLeft(navigation: FeedHomeHeaderLeftProps) {
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color="black" size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const styles = StyleSheet.create({});

export default FeedHomeHeaderLeft;
