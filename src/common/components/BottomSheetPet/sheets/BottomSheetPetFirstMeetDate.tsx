import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {formatDate} from '../../../utils/DateUtils';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../../app/store';
import {
  selectPetInfo,
  setPetFirstMeetDate,
} from '../../../../features/mypet/petInfoSlice';

function BottomSheetPetFirstMeetDate() {
  const dispatch = useAppDispatch();
  const currentPetInfo = useSelector(selectPetInfo);
  const onSet = (petFirstMeetDate: Date) => {
    const formattedDate = formatDate(petFirstMeetDate);
    dispatch(setPetFirstMeetDate(formattedDate));
  };

  return (
    <>
      <Title>
        <Heading>
          {currentPetInfo.name}와 처음 만난날은{'\n'}언제인가요?
        </Heading>
      </Title>
      <PetDatePicker
        locale="ko"
        mode="date"
        maximumDate={new Date()}
        date={
          currentPetInfo.firstMeetDate
            ? new Date(currentPetInfo.firstMeetDate)
            : new Date()
        }
        onDateChange={petFirstMeetDate => onSet(petFirstMeetDate)}
      />
    </>
  );
}

export default BottomSheetPetFirstMeetDate;

const Title = styled.Text`
  margin-bottom: 40px;
`;

const PetDatePicker = styled(DatePicker)<DatePickerProps>`
  height: 130px;
`;
