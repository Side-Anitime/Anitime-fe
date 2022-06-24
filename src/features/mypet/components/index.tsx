import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPetsUserInfoScreen from './MyPetsUserInfoScreen';
import SettingMenuScreen from './SettingMenuScreen';
import AccountSettingMenuScreen from './AccountSettingMenuScreen';
import PetInfoEditScreen from "./PetInfoEditScreen"
import {MyPetStackParamList} from '../../../common/models';

const Stack = createNativeStackNavigator<MyPetStackParamList>();

function MyPet() {
  return (
    <Stack.Navigator initialRouteName="MyPetsUserInfoScreen">
      <Stack.Screen
        name="MyPetsUserInfoScreen"
        component={MyPetsUserInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PetInfoEditScreen"
        component={PetInfoEditScreen}
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
