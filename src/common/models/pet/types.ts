export type Species = 'DOG' | 'CAT';

export type Gender = 'MALE' | 'FEMALE';

export type StringBoolean = 'Y' | 'N';

export type PetKind = {
  petTypeId: number;
  type: string;
  kindName: string;
};

export type PetInfo = {
  // info req.
  petId?: string; // 반려동물 고유 아이디
  userToken?: string; // 사용자 식별 아이디
  regDate?: string;
  updateDate?: string;
  // 반려동물 등록/수정시
  petKindId?: number;
  // info opt
  type?: Species;
  name?: string;
  gender?: Gender;
  neuterYn?: StringBoolean;

  representYn?: StringBoolean;
  petKind?: PetKind;
  shortIntroduce?: string;
  birthday?: string;
  firstMeetDate?: string;
  image?: string;
  personality?: string;
};
