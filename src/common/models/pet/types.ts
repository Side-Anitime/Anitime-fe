export type Species = 'dog' | 'cat';

export type Gender = 'M' | 'F';

export type PetInfo = {
  // info req.
  id: string; // 고유 아이디
  regDate: string; // 등록날짜
  // info opt.
  species?: Species; // 강아지 / 고양이
  name?: string; // 이름
  breed?: string; // 품종
  gender?: Gender;
  birthDate?: string; // 생일
  firstMeetDate?: string; // 처음만난날
  isNeutered?: string; // 중성화 여부 Y N
  memo?: string; // 소개
  avatarUrl?: string; // 이미지
};
