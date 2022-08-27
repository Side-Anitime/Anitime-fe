import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useMutation, useQuery} from '@tanstack/react-query';
import {PetInfo} from '../models';
import PetListResponse from '../models/pet/response';

const tempUserToken = 'testtoken';
/*
 *
 * LIST
 *
 */
export const useListPet = () => {
  return useQuery(['pet'], async () => {
    const {data}: PetListResponse = await axios.get(
      `${Config.API_HOST}/pet/list/{userToken}?userToken=${tempUserToken}`,
    );

    return data;
  });
};
/*
 *
 * UPDATE
 *
 */
const onUpdatePet = async (petInfo: PetInfo) => {
  try {
    const result = await axios.put(`${Config.API_HOST}/pet/modify`, petInfo);
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
      console.log('success');
    },
    onError: () => {
      console.log('error');
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
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
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
