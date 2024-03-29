import React, {RefObject} from 'react';
import {Image} from 'native-base';
import {actionBtn} from '../../assets';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
  src?: ImageSourcePropType;
  offsetX?: number;
  offsetY?: number;
  fixNativeFeedbackRadius?: boolean;
  zIndex?: number;
  size?: number;
  degrees?: number;
}

function ActionButton({onPress, src}: Props) {
  const handleOnPress = () => {
    onPress();
  };

  return (
    <View style={styles.overlay} pointerEvents={'box-none'}>
      <TouchableOpacity
        style={{...styles.wrapper}}
        accessibilityRole="button"
        onPress={handleOnPress}>
        <Image
          source={src ?? actionBtn}
          alt="버튼"
          style={styles.button}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 34,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  wrapper: {
    width: '30%',
  },
  button: {alignSelf: 'center'},
});

export default ActionButton;
