import React from 'react';
import {View, Text} from 'react-native';
import {CalendarStackScreenProps} from '../../../common/models';

function CalendarFormScreen({
  route,
}: CalendarStackScreenProps<'CalendarFormScreen'>) {
  const {item} = route.params;
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
}

export default CalendarFormScreen;
