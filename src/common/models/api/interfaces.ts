import {Plan} from '..';
import {PetInfo} from '../data/pet';

/*
 *
 * BASE
 *
 */
export interface BaseParams {
  userToken: string;
}

interface BaseReponse {
  transactionTime: string;
  resultCode: string;
  description: string;
}

/*
 *
 * PET
 *
 */
export interface PetListResponse extends BaseReponse {
  data: Array<PetInfo>;
}
export interface PetDeleteParams extends BaseParams {
  petId: number;
}

/*
 *
 * PET
 *
 */
export interface PlanByDateResponse extends BaseReponse {
  data: Array<Plan>;
}
export interface PlanByDateParams {
  year: string;
  month: string;
  day: string;
}
