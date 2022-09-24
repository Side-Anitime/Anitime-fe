import React, {RefObject} from 'react';
import {Text} from 'react-native-svg';
import union from '../../asstes/UI/rounded_edge_bottom_tab.png';
import styled from 'styled-components/native';
import {Image} from 'native-base';
import actionButton from '../../asstes/UI/actionbutton.png';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {isAndroid} from '../../utils/shared';

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

  const parentStyle =
    isAndroid && fixNativeFeedbackRadius
      ? {
          right: offsetX,
          zIndex: zIndex,
          borderRadius: size ? size / 2 : undefined,
          width: size,
          paddingVertical: offsetY,
        }
      : {
          marginHorizontal: offsetX,
          zIndex: zIndex,
          paddingVertical: offsetY,
        };

  return (
    <View style={styles.overlay} pointerEvents={'box-none'}>
      <TouchableOpacity
        style={parentStyle}
        accessibilityRole="button"
        onPress={handleOnPress}>
        <Image source={src ?? actionButton} alt="버튼" />
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
  button: {},
});

export default ActionButton;

ActionButton.defaultProps = {
  fixNativeFeedbackRadius: false,
  size: 56,
  degrees: 45,
  offsetX: 22,
  offsetY: 30,
};
