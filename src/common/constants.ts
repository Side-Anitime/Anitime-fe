export const korMonth = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const hiddenTabList = ['CalendarFormScreen', 'PetInfoEditScreen'];

export const CATEGORIES = ['생일', '병원', '산책', '모임', '기타'];

export const EMAIL_REG_EXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PETNAME_REG_EXP = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{0,10}$/;
export const NICKNAME_REG_EXP = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
export const PASSWORD_REG_EXP =
  /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,20}$/;
export const PASSWORD_VALIDATION_MESSAGE =
  '문자, 숫자, 특수문자를 포함하여 작성해주세요(8이상 ~ 20이하)';
