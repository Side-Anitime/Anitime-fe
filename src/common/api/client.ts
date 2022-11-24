import axios from 'axios';
import Config from 'react-native-config';

export const client = axios.create();
client.defaults.baseURL = Config.API_HOST;
