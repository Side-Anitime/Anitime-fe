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

function ActionButton(props: Props) {
  const onPress = () => {
    props.onPress();
  };

  const parentStyle =
    isAndroid && props.fixNativeFeedbackRadius
      ? {
          right: props.offsetX,
          zIndex: props.zIndex,
          borderRadius: props.size ? props.size / 2 : undefined,
          width: props.size,
          paddingVertical: props.offsetY,
        }
      : {
          marginHorizontal: props.offsetX,
          zIndex: props.zIndex,
          paddingVertical: props.offsetY,
        };

  return (
    <TouchableOpacity
      style={{
        ...styles.wrapper,
        ...parentStyle,
      }}
      accessibilityRole="button"
      onPress={onPress}>
      <Image source={props.src ?? actionButton} alt="버튼" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
  offsetX: 30,
  offsetY: 30,
  fixNativeFeedbackRadius: false,
  size: 56,
  degrees: 45,
};
