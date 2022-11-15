import React, {useEffect, useRef} from 'react';
import {CATEGORIES} from '../../../common/constants';
import BottomSheet from '../../../common/components/BottomSheet';
import {CalendarStackScreenProps} from '../../../common/models';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import MyCalendar from './Calendar';
import {useAppDispatch} from '../../../app/store';
import {
  resetButton,
  selectActionButton,
} from '../../../common/components/ActionButton/actionButtonSlice';

function CalendarScreen({
  navigation,
}: CalendarStackScreenProps<'CalendarScreen'>) {
  const refRBSheet = useRef<RBSheet>(null);
  const dispatch = useAppDispatch();
  const buttonPressed = useSelector(selectActionButton)[1];

  useEffect(() => {
    if (buttonPressed) {
      navigation.navigate('CalendarFormScreen');
      dispatch(resetButton());
    }
  }, [buttonPressed]);

  return (
    <Container>
      <MyCalendar />
      {/*<BottomSheet*/}
      {/*  title="말머리 선택"*/}
      {/*  height={400}*/}
      {/*  titlePosition={'center'}*/}
      {/*  refRBSheet={refRBSheet}>*/}
      {/*  {CATEGORIES.map(item => (*/}
      {/*    <ListText>{item}</ListText>*/}
      {/*  ))}*/}
      {/*</BottomSheet>*/}
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
