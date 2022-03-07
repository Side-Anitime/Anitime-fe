import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPetsUserInfoScreen from './MyPetsUserInfoScreen';

const Stack = createNativeStackNavigator();

function MyPet() {
  return (
    <Stack.Navigator initialRouteName="MyPetsUserInfoScreen">
      <Stack.Screen
        name="MyPetsUserInfoScreen"
        component={MyPetsUserInfoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default MyPet;
