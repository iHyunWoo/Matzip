import React from 'react';
import {StyleSheet} from 'react-native';
import {colors, feedNavigations} from '../../constants';
import {createStackNavigator} from '@react-navigation/stack';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen.tsx';
import FeedHomeHeaderLeft from '../../components/FeedHomeHeaderLeft.tsx';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  // [feedNavigations.FEED_DETAIL]: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedStackNavigator() {
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
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default FeedStackNavigator;
