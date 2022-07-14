export type Species = 'DOG' | 'CAT';

export type Gender = 'MALE' | 'FEMALE';

export type StringBoolean = 'Y' | 'N';

export type PetInfo = {
  // info req.
  petId: string; // 반려동물 고유 아이디
  userToken: string; // 사용자 식별 아이디

  // info opt
  type?: Species;
  name?: string;
  gender?: Gender;
  neuterYn?: StringBoolean;
  representYn?: StringBoolean;
  petKindId?: string;
  shortIntroduce?: string;
  birthDate?: string;
  firstMeetDate?: string;
  avatarUrl?: string;
  // regDate: string; // 등록날짜
  // avatarUrl?: string; // 이미지
};
