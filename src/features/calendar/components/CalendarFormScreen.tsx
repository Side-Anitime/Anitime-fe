import React, {useState} from 'react';
import {Text} from 'react-native';
import {CalendarStackScreenProps} from '../../../common/models';
import {Calendar} from 'react-native-calendars';
import {ListItem} from '@rneui/themed';
import {CATEGORIES} from '../../../common/constants';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import MyCalendar from './Calendar';

function CalendarFormScreen({
  route,
}: CalendarStackScreenProps<'CalendarFormScreen'>) {
  const [date, setDate] = useState(new Date());
  const [expandedCategory, setExpandedCategory] = useState<boolean>();
  const [expandedTime, setExpandedTime] = useState<boolean>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const onPress = name => {
    setSelectedCategory(name);
    setTimeout(() => setExpandedCategory(!expandedCategory), 200);
  };

  return (
    <Container>
      <MyCalendar />
      <ListItem.Accordion
        containerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#E6E6E6',
        }}
        content={
          <ListItem.Content>
            <Title>카테고리</Title>
            <SubTitle>
              {selectedCategory ? selectedCategory : '카테고리를 선택해주세요'}
            </SubTitle>
          </ListItem.Content>
        }
        isExpanded={expandedCategory}
        onPress={() => {
          setExpandedCategory(!expandedCategory);
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
        containerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: '#E6E6E6',
          marginTop: 10,
        }}
        content={
          <ListItem.Content>
            <Title>시간</Title>
            <SubTitle>
              {selectedTime ? selectedTime : '시간을 선택해주세요'}
            </SubTitle>
          </ListItem.Content>
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
    </Container>
  );
}

const Container = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 14px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  color: #b3b3b3; ;
`;

// @ts-ignore
const StyledListItem = styled.Pressable`
  display: flex;
  padding-left: 20px;
  justify-content: center;
  background-color: ${({selectedCategory}) =>
    selectedCategory ? '#D9D9D9' : 'white'};
  height: 53px;
`;

export default CalendarFormScreen;
