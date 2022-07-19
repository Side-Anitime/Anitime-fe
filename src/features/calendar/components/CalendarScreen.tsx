import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
// import ActionButton from 'react-native-action-button';
import deepmerge from 'deepmerge';
import {CATEGORIES, korMonth} from '../../../common/constants';
import BottomSheet from '../../../common/components/BottomSheet';
import {CalendarStackScreenProps} from '../../../common/models';
import ActionButton from '../../../common/components/ActionButton/ActionButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';

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

const hospital = {key: 'vacation', color: 'red'};
const walk = {key: 'walk', color: 'blue'};
const workout = {key: 'workout', color: 'green'};

const dummyData = {
  '2022-04-01': {
    name: '병원',
    dots: [hospital],
  },
  '2022-04-02': {name: ['산책', '병원'], dots: [walk, workout], disabled: true},
  '2022-04-03': {dots: [walk, workout]},
};

function CalendarScreen({
  navigation,
}: CalendarStackScreenProps<'CalendarScreen'>) {
  const [curDay, setCurDay] = useState('');
  const [selectedDay, setSelectedDay] = useState({});

  const refRBSheet = useRef<RBSheet>(null);

  const onDayPress = day => {
    setCurDay(day.dateString);
    const mergedDay = deepmerge(dummyData, {
      [day.dateString]: {
        selected: true,
        color: 'blue',
      },
    });
    setSelectedDay(mergedDay);
  };

  const onPressActionButton = () => {
    refRBSheet.current?.open();
  };

  return (
    <View style={{flex: 1}}>
      <Calendar
        monthFormat={'yyyy년 MM월'}
        enableSwipeMonths={true}
        onDayPress={onDayPress}
        markingType={'multi-dot'}
        markedDates={selectedDay}
      />
      <Text>{dummyData?.[curDay]?.name}</Text>
      <ActionButton onPress={onPressActionButton} />
      <BottomSheet
        title="말머리 선택"
        height={400}
        titlePosition={'center'}
        refRBSheet={refRBSheet}>
        {CATEGORIES.map(item => (
          <ListText>{item}</ListText>
        ))}
      </BottomSheet>
    </View>
  );
}

const ListText = styled.Text`
  padding: 10px;
`;

export default CalendarScreen;
