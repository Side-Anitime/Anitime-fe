import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Center, Image} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {buttonHolder} from '../asstes';

interface Props extends BottomTabBarProps {}

export default function BottomTabBar({descriptors, state, navigation}: Props) {
  return (
    <Wrapper pointerEvents={'box-none'}>
      <ButtonHolder alt="buttonholder" source={buttonHolder} />
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
          // if (options.tabBarStyle && options.tabBarStyle.display === 'none') {
          //   return <View key={index}></View>;
          // }
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
      <Spacer />
    </Wrapper>
  );
}

const Spacer = styled.View`
  width: 120px;
  height: 60px;
`;
const Wrapper = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
`;
const ButtonHolder = styled(Image)`
  position: absolute;
  bottom: 0;
  height: 62px;
  width: 100%;
`;
const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f5f5f5;
  flex-grow: 1;
  background-color: transparent;
`;
const BottomTabBarButton = styled(TouchableOpacity)`
  margin: auto;
  box-sizing: content-box;
  background-color: #f5f5f5;
  background-color: transparent;
`;
const UnionView = styled.View`
  right: 0;
  background-color: transparent;
`;
