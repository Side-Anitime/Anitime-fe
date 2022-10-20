import {Platform} from 'react-native';
import {Dimensions} from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const {width, height} = Dimensions.get('window');
