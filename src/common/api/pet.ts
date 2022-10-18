import {useDelete, useFetch, usePost, useUpdate} from './reactQuery';
import {PetInfo, PetListResponse} from '../models';

/*
 *
 * LIST
 *
 */
export const useListPet = (userToken: string) =>
  useFetch<PetListResponse>(`/pet/list/{userToken}?userToken=${userToken}`);
/*
 *
 * SAVE
 *
 */
export const useSavePet = () => usePost<PetInfo[], PetInfo>(`/pet/save`);
/*
 *
 * UPDATE
 *
 */
export const useUpdatePet = () => useUpdate<PetInfo[], PetInfo>(`/pet/modify`);
/*
 *
 * DELETE
 *
 */

export const useDeletePet = (userToken: string) =>
  useDelete(`/pet/delete/${userToken}`);

/*
 *
 *
 *
 */
