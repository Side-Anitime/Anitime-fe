import {PetInfo} from '../data/pet';

/*
 *
 * BASE
 *
 */
export interface BaseParams {
  userToken: string;
}

/*
 *
 * PET
 *
 */
export interface PetListResponse {
  data: Array<PetInfo>;
}
export interface PetDeleteParams extends BaseParams {
  petId: number;
}
