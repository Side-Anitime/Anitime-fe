import React, {useRef} from 'react';
import {CATEGORIES} from '../../../common/constants';
import BottomSheet from '../../../common/components/BottomSheet';
import {CalendarStackScreenProps} from '../../../common/models';
import ActionButton from '../../../common/components/ActionButton/ActionButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';
import MyCalendar from './Calendar';

function CalendarScreen({
  navigation,
}: CalendarStackScreenProps<'CalendarScreen'>) {
  const refRBSheet = useRef<RBSheet>(null);

  return (
    <Container>
      <MyCalendar />
      <ActionButton onPress={() => navigation.navigate('CalendarFormScreen')} />
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
