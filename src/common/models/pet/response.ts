import {PetInfo} from './types';

interface PetListResponse {
  data: {data: Array<PetInfo>};
}

export default PetListResponse;
