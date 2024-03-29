import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {getPathFromState, useNavigation} from '@react-navigation/native';
import {Center} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useAppDispatch} from '../../app/store';
import {buttonHolder} from '../assets';
import {hiddenTabList} from '../constants';
import ActionButton from './ActionButton/ActionButton';
import {
  resetButton,
  selectActionButton,
  setButton,
} from './ActionButton/actionButtonSlice';

interface Props extends BottomTabBarProps {}

export default function BottomTabBar({descriptors, state, navigation}: Props) {
  const dispatch = useAppDispatch();

  const getDisplay = () => {
    const path = getPathFromState(state);
    if (hiddenTabList.find(value => path.includes(value))) {
      return false;
    }
    return true;
  };

  const dropAnim = useRef(new Animated.Value(1)).current;

  const dropIn = () => {
    Animated.timing(dropAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const dropOut = () => {
    Animated.timing(dropAnim, {
      toValue: 100,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (getDisplay()) {
      dropIn();
    } else {
      dropOut();
    }
  }, [getDisplay()]);

  return (
    <Wrapper
      pointerEvents={'box-none'}
      style={{transform: [{translateY: dropAnim}]}}>
      <ImageWrapper pointerEvents={'none'}>
        <ButtonHolder source={buttonHolder} resizeMode="stretch" />
      </ImageWrapper>
      <ButtonWrapper>
        {state.routes.map((route, index) => {
          const {options, render} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const icon = options.tabBarIcon
            ? options.tabBarIcon({
                focused: isFocused,
                color: '',
                size: 2,
              })
            : undefined;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved

              navigation.navigate({
                name: route.name,
                merge: true,
                params: {},
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <BottomTabBarButton
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Center>{icon}</Center>
            </BottomTabBarButton>
          );
        })}
      </ButtonWrapper>
      <ActionButton
        onPress={() => {
          dispatch(setButton(navigation.getState().index));
        }}
      />
      <Spacer />
    </Wrapper>
  );
}

const Spacer = styled.View`
  width: 100px;
  height: 70px;
  backgroundcolor: 'blue';
`;
const Wrapper = styled(Animated.View)`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
`;
const ButtonHolder = styled.Image`
  width: 100%;
`;
const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f5f5f5;
  flex-grow: 1;
  padding-left: 10px;
  background-color: transparent;
`;
const BottomTabBarButton = styled(TouchableOpacity)`
  margin: auto;
  box-sizing: content-box;
  background-color: #f5f5f5;
  background-color: transparent;
`;
const ImageWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
`;
