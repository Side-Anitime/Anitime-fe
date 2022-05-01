import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';

const Stack = createNativeStackNavigator();

function CalendarFormScreen({route}) {
  const {item} = route.params;
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
}

export default CalendarFormScreen;
