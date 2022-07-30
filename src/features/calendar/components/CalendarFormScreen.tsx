import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {CalendarStackScreenProps} from '../../../common/models';
import {Calendar} from 'react-native-calendars';
import {ListItem} from '@rneui/themed';
import {CATEGORIES} from '../../../common/constants';
import styled from 'styled-components/native';

function CalendarFormScreen({
  route,
}: CalendarStackScreenProps<'CalendarFormScreen'>) {
  const [expanded, setExpanded] = useState<boolean>();
  const [selectedCategory, setSelectedCategory] = useState<boolean>();

  const onPress = name => {
    setSelectedCategory(name);
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
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {CATEGORIES.map((name, i) => (
          <StyledListItem
            key={name}
            onPress={() => onPress(name)}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </StyledListItem>
        ))}
      </ListItem.Accordion>
    </>
  );
}

const StyledListItem = styled(ListItem)`
  background-color: green;
`;

export default CalendarFormScreen;
