import React, {RefObject} from 'react';
import {Image} from 'native-base';
import actionButton from '../../asstes/UI/actionbutton.png';
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

function ActionButton({
  onPress,
  fixNativeFeedbackRadius,
  offsetX,
  offsetY,
  size,
  zIndex,
  src,
}: Props) {
  const handleOnPress = () => {
    onPress();
  };

  const parentStyle = {
    zIndex: zIndex,
    paddingHorizontal: offsetX,
    paddingVertical: offsetY,
  };

  return (
    <View style={styles.overlay} pointerEvents={'box-none'}>
      <TouchableOpacity
        style={{...styles.wrapper, ...parentStyle}}
        accessibilityRole="button"
        onPress={handleOnPress}>
        <Image
          source={src ?? actionButton}
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
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  wrapper: {
    width: '30%',
  },
  button: {alignSelf: 'center'},
});

export default ActionButton;

ActionButton.defaultProps = {
  fixNativeFeedbackRadius: false,
  size: 56,
  degrees: 45,
  offsetX: 10,
  offsetY: 30,
};
