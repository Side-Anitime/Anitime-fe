import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useMutation, useQuery} from '@tanstack/react-query';
import {PetInfo} from '../models';
import PetListResponse from '../models/pet/response';

//NOTE: 로딩화면 테스트용 시간지연
const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const tempUserToken = 'testtoken';
/*
 *
 * LIST
 *
 */
export const useListPet = (refetchInterval?: number) => {
  return useQuery(
    ['pet'],
    async () => {
      console.log('REFETCH');
      const {data}: PetListResponse = await axios.get(
        `${Config.API_HOST}/pet/list/{userToken}?userToken=${tempUserToken}`,
      );
      return data;
    },
    // 자동으로 fetch 되는것 방지
    // {enabled: false},
  );
};
/*
 *
 * SAVE
 *
 */
const onSavePet = async (petInfo: PetInfo) => {
  try {
    const result = await axios.post(`${Config.API_HOST}/pet/save`, petInfo);
    return result.data;
  } catch (e) {
    console.log('ERROR: ', e);
  }
};
export const useSavePet = () => {
  const {
    mutate: savePet,
    status: savePetStatus,
    error: savePetError,
  } = useMutation<PetInfo, AxiosError, PetInfo>(onSavePet, {
    onSuccess: data => {
      console.log('PET SAVE COMPLETE: ', data);
    },
    onError: error => {
      console.log('PET SAVE ERROR: ', error);
    },
    onSettled: () => {
      // queryClient.invalidateQueries('modify');
    },
  });
  return {savePet, savePetStatus, savePetError};
};
/*
 *
 * UPDATE
 *
 */
const onUpdatePet = async (petInfo: PetInfo) => {
  try {
    const result = await axios.put(`${Config.API_HOST}/pet/modify`, petInfo);
    await timeout(500);
    return result.data;
  } catch (e) {
    console.log('ERROR: ', e);
  }
};
export const useUpdatePet = () => {
  const {
    mutate: updatePet,
    status: updatePetStatus,
    error: updatePetError,
  } = useMutation<PetInfo, AxiosError, PetInfo>(onUpdatePet, {
    onSuccess: data => {
      console.log('PET UPDATE COMPLETE: ', data);
    },
    onError: error => {
      console.log('PET UPDATE ERROR: ', error);
    },
    onSettled: () => {
      // queryClient.invalidateQueries('modify');
    },
  });
  return {updatePet, updatePetStatus, updatePetError};
};
/*
 *
 * DELETE
 *
 */
type DeleteParams = {
  userToken: string;
  petId: number;
};
const onDeletePet = async ({userToken, petId}: DeleteParams) => {
  try {
    const result = await axios.delete(
      `${Config.API_HOST}/pet/delete/${userToken}/${petId}`,
    );
    return result;
  } catch (e) {
    console.log('ERROR: ', e);
  }
};
export const useDeletePet = () => {
  const {
    mutate: deletePet,
    status: deletePetStatus,
    error: deletePetError,
  } = useMutation<unknown, AxiosError, DeleteParams>(onDeletePet, {
    onSuccess: data => {
      console.log('PET DELETE COMPLETE: ', data);
    },
    onError: error => {
      console.log('PET DELETE ERROR: ', error);
    },
    onSettled: () => {
      // queryClient.invalidateQueries('modify');
    },
  });
  return {deletePet, deletePetStatus, deletePetError};
};
/*
 *
 *
 *
 */
