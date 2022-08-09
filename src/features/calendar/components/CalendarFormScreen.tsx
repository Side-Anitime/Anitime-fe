import React, {useState} from 'react';
import {Text} from 'react-native';
import {CalendarStackScreenProps} from '../../../common/models';
import {Calendar} from 'react-native-calendars';
import {ListItem} from '@rneui/themed';
import {CATEGORIES} from '../../../common/constants';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';

function CalendarFormScreen({
  route,
}: CalendarStackScreenProps<'CalendarFormScreen'>) {
  const [date, setDate] = useState(new Date());
  const [expanded, setExpanded] = useState<boolean>();
  const [expandedTime, setExpandedTime] = useState<boolean>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const onPress = name => {
    setSelectedCategory(name);
    setTimeout(() => setExpanded(!expanded), 200);
  };

  return (
    <>
      {/*<Calendar*/}
      {/*  monthFormat={'yyyy년 MM월'}*/}
      {/*  enableSwipeMonths={true}*/}
      {/*  markingType={'multi-dot'}*/}
      {/*/>*/}
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>카테고리</ListItem.Title>
              <Text>{selectedCategory}</Text>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {CATEGORIES.map(name => (
          <StyledListItem
            key={name}
            selectedCategory={selectedCategory === name}
            onPress={() => onPress(name)}>
            <Text>{name}</Text>
          </StyledListItem>
        ))}
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>시간</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedTime}
        onPress={() => {
          setExpandedTime(!expandedTime);
        }}>
        <DatePicker
          locale="ko"
          mode="time"
          date={date}
          onDateChange={date => {
            console.log(date);
          }}
        />
      </ListItem.Accordion>
    </>
  );
}

// @ts-ignore
const StyledListItem = styled.Pressable`
  background-color: ${({selectedCategory}) =>
    selectedCategory ? '#D9D9D9' : 'white'};
  height: 53px;
`;

export default CalendarFormScreen;
