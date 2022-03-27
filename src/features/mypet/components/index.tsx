import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPetsUserInfoScreen from './MyPetsUserInfoScreen';
import SettingMenuScreen from './SettingMenuScreen';
import AccountSettingMenuScreen from './AccountSettingMenuScreen';

const Stack = createNativeStackNavigator();

function MyPet() {
  return (
    <Stack.Navigator initialRouteName="MyPetsUserInfoScreen">
      <Stack.Screen
        name="MyPetsUserInfoScreen"
        component={MyPetsUserInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingMenuScreen"
        component={SettingMenuScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountSettingMenuScreen"
        component={AccountSettingMenuScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default MyPet;
