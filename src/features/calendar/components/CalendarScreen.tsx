import React, {useEffect, useRef, useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import deepmerge from 'deepmerge';
import {CATEGORIES, korMonth} from '../../../common/constants';
import BottomSheet from '../../../common/components/BottomSheet';
import {CalendarStackScreenProps} from '../../../common/models';
import ActionButton from '../../../common/components/ActionButton/ActionButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';
import {useQuery} from '@tanstack/react-query';
import {getPlans} from '../calendarSlice';

LocaleConfig.locales.kr = {
  monthNames: korMonth,
  monthNamesShort: korMonth,
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

function CalendarScreen({
  navigation,
}: CalendarStackScreenProps<'CalendarScreen'>) {
  const {data: calendarData, status} = useQuery(['plans'], () =>
    getPlans('2022', '07', 'testtoken'),
  );

  const [selectedDay, setSelectedDay] = useState({});
  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    setSelectedDay(calendarData);
  }, [status, calendarData]);

  const onDayPress = day => {
    const mergedDay = deepmerge(calendarData, {
      [day.dateString]: {
        marked: true,
        selected: true,
        color: 'blue',
      },
    });
    setSelectedDay(mergedDay);
  };

  return (
    <Container>
      <Calendar
        monthFormat={'yyyy년 MM월'}
        enableSwipeMonths={true}
        onDayPress={onDayPress}
        markingType={'multi-dot'}
        markedDates={selectedDay}
      />
      <ActionButton onPress={() => navigation.navigate('CalendarFormScreen')} />
      <BottomSheet
        title="말머리 선택"
        height={400}
        titlePosition={'center'}
        refRBSheet={refRBSheet}>
        {CATEGORIES.map(item => (
          <ListText>{item}</ListText>
        ))}
      </BottomSheet>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ListText = styled.Text`
  padding: 10px;
`;

export default CalendarScreen;
