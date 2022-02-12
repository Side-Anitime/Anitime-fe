import React from 'react';
import Complete from '../../common/components/Complete';
import Ing from '../../common/components/Ing';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CalendarForm() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{title: '진행중'}} />
      {/* 로딩시간이 오래 걸리는 페이지 같은 경우 stack으로 덮어버린다 (지도) */}
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{title: '완료하기'}}
      />
    </Stack.Navigator>
  );
}

export default CalendarForm;
