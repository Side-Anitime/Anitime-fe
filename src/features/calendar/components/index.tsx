import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from './CalendarScreen';
import CalendarFormScreen from './CalendarFormScreen';
import {CalendarStackParamList} from '../../../common/models';

const Stack = createNativeStackNavigator<CalendarStackParamList>();

function Calendar() {
  return (
    <Stack.Navigator initialRouteName="CalendarScreen">
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CalendarFormScreen"
        component={CalendarFormScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default Calendar;
