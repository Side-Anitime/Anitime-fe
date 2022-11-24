import React, {useEffect, useState} from 'react';
import {Calendar, LocaleConfig, DateData} from 'react-native-calendars';
import deepmerge from 'deepmerge';
import {korMonth} from '../../../common/constants';
import {useQuery} from '@tanstack/react-query';
import {getPlans, setCurMonthPlans, setSelectedDate} from '../calendarSlice';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../app/store';
import dayjs from 'dayjs';

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

function MyCalendar() {
  const {curMonthPlans} = useSelector(state => state.calendar);
  const dispatch = useAppDispatch();
  const [curMonth, setCurMonth] = useState<string>(dayjs().format('MM'));

  const {data: calendarData, status} = useQuery(['plans', curMonth], () =>
    getPlans('2022', curMonth, 'testtoken'),
  );

  useEffect(() => {
    dispatch(setCurMonthPlans(calendarData));
  }, [status, calendarData, dispatch]);

  const onDayPress = (day: DateData) => {
    const mergedDay = deepmerge(calendarData, {
      [day.dateString]: {
        marked: true,
        selected: true,
        color: 'blue',
      },
    });
    dispatch(setSelectedDate(day));
    dispatch(setCurMonthPlans(mergedDay));
  };

  const onMonthChange = (monthData: DateData) => {
    setCurMonth(monthData.month.toString().padStart(2, '0'));
  };

  return (
    <Calendar
      initialDate=""
      context={{date: ''}}
      monthFormat={'yyyy년 MM월'}
      enableSwipeMonths={true}
      onDayPress={onDayPress}
      onMonthChange={onMonthChange}
      markingType={'multi-dot'}
      markedDates={curMonthPlans}
    />
  );
}

export default MyCalendar;
