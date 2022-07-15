import axios from 'axios';
import React from 'react';
import {useQuery} from 'react-query';
import {PetInfo} from '../common/models';
import PetListResponse from '../common/models/pet/response';

const temp =
  'http://3.34.198.47:8888/anitime/pet/list/{userToken}?userToken=testtoken';

export function fetchPetList() {
  return useQuery(['pet'], async () => {
    const {data}: PetListResponse = await axios.get(temp);

    return data;
  });
}
