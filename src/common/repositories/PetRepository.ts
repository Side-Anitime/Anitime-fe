import axios from 'axios';
import Config from 'react-native-config';
import {useQuery} from '@tanstack/react-query';
import {PetInfo} from '../models';
import PetListResponse from '../models/pet/response';

const tempUserToken = 'testtoken';

export function fetchPetList() {
  return useQuery(['pet'], async () => {
    const {data}: PetListResponse = await axios.get(
      `${Config.API_HOST}/pet/list/{userToken}?userToken=${tempUserToken}`,
    );

    return data;
  });
}

export const editPetInfo = async (petInfo: PetInfo) => {
  try {
    const result = await axios.put(`${Config.API_HOST}/pet/modify`, petInfo);
    console.log('result', result);
    return result.data;
  } catch (e) {
    console.log('ERROR: ', e);
  }
};
