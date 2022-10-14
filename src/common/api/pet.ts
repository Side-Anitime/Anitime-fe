import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useMutation, useQuery} from '@tanstack/react-query';
import {PetInfo} from '../models';
import PetListResponse from '../models/pet/response';
import {useDelete, useFetch, usePost, useUpdate} from './reactQuery';

const tempUserToken = Config.TEST_TOKEN;

/*
 *
 * LIST
 *
 */
export const useFetchUsers = () =>
  useFetch<PetListResponse>(`/pet/list/{userToken}?userToken=${tempUserToken}`);
/*
 *
 * SAVE
 *
 */

export const useSavePet = (petInfo: PetInfo) =>
  usePost<PetInfo, PetInfo>(`/pet/save`, petInfo);
/*
 *
 * UPDATE
 *
 */

export const useUdatePet = (petInfo: PetInfo) =>
  useUpdate<PetInfo, PetInfo>(`/pet/modify`, petInfo);
/*
 *
 * DELETE
 *
 */
type DeleteParams = {
  userToken: string;
  petId: number;
};
export const useDeletePet = ({userToken, petId}: DeleteParams) =>
  useDelete(`/pet/delete/${userToken}/${petId}`);

/*
 *
 *
 *
 */
