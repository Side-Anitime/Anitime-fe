import React from 'react';
import {View, Text} from 'react-native';
import Complete from '../../common/components/Complete';
import Ing from '../../common/components/Ing';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalendarForm() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{title: '진행중'}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{title: '완료하기'}}
      />
    </Stack.Navigator>
  );
}

export default CalendarForm;
