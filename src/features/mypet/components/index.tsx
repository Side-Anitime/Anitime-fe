import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingMenuScreen from './SettingMenuScreen';
import AccountSettingMenuScreen from './AccountSettingMenuScreen';
import PetInfoEditScreen from './PetInfoEditScreen';
import {MyPetStackParamList} from '../../../common/models';
import PetListDisplayScreen from './PetListDisplayScreen';
import PetInfoDisplayScreen from './PetInfoDisplayScreen';

const Stack = createNativeStackNavigator<MyPetStackParamList>();

function MyPet() {
  return (
    <Stack.Navigator initialRouteName="PetListDisplayScreen">
      <Stack.Screen
        name="PetListDisplayScreen"
        component={PetListDisplayScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PetInfoDisplayScreen"
        component={PetInfoDisplayScreen}
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
