import axios from 'axios';
import Config from 'react-native-config';
import {useQuery} from 'react-query';
import PetListResponse from '../common/models/pet/response';

const tempUserToken = 'testtoken';

export function fetchPetList() {
  return useQuery(['pet'], async () => {
    const {data}: PetListResponse = await axios.get(
      `${Config.API_HOST}/pet/list/{userToken}?userToken=${tempUserToken}`,
    );

    return data;
  });
}
