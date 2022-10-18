import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {formatDateToString} from '../../../utils/timeUtils';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../../app/store';
import {
  selectPetInfo,
  setPetBirthday,
} from '../../../../features/mypet/petInfoSlice';

function BottomSheetPetBirthDate() {
  const dispatch = useAppDispatch();
  const currentPetInfo = useSelector(selectPetInfo);
  const onSet = (birthday: Date) => {
    const formattedDate = formatDateToString(birthday);
    dispatch(setPetBirthday(formattedDate));
  };

  return (
    <>
      <Title>
        <Heading>
          {currentPetInfo.name}의{'\n'}생일은 언제인가요?
        </Heading>
      </Title>
      <PetDatePicker
        locale="ko"
        mode="date"
        maximumDate={new Date()}
        date={
          currentPetInfo.birthday
            ? new Date(currentPetInfo.birthday)
            : new Date()
        }
        onDateChange={petBirthDate => onSet(petBirthDate)}
      />
    </>
  );
}

export default BottomSheetPetBirthDate;

const Title = styled.Text`
  margin-bottom: 40px;
`;

const PetDatePicker = styled(DatePicker)<DatePickerProps>`
  height: 130px;
`;
