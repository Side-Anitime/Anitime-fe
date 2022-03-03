import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from './CalendarScreen';
import CalendarFormScreen from './CalendarFormScreen';
const Stack = createNativeStackNavigator();

function Calendar() {
  return (
    <Stack.Navigator initialRouteName="CalendarScreen">
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CalendarFormScreen" component={CalendarFormScreen} />
    </Stack.Navigator>
  );
}
export default Calendar;