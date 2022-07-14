import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Center, Image} from 'native-base';
import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import union from '../asstes/UI/rounded_edge_bottom_tab.png';
import ActionButton from './ActionButton/ActionButton';

interface Props extends BottomTabBarProps {}

export default function BottomTabBar(props: Props) {
  return (
    <Wrapper pointerEvents={'box-none'}>
      <ButtonWrapper>
        {props.state.routes.map((route, index) => {
          const {options, render} = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = props.state.index === index;
          const icon = options.tabBarIcon
            ? options.tabBarIcon({
                focused: route.name === options.title,
                color: '',
                size: 2,
              })
            : undefined;
          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              props.navigation.navigate({
                name: route.name,
                merge: true,
                params: {},
              });
            }
          };

          const onLongPress = () => {
            props.navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          if (options.tabBarStyle && options.tabBarStyle.display === 'none') {
            return <View key={index}></View>;
          }
          return (
            <BottomTabBarButton
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Center>
                {icon}
                <Text
                // style={{color: isFocused ? '#673ab7' : '#222'}}
                >
                  {label}
                </Text>
              </Center>
            </BottomTabBarButton>
          );
        })}
      </ButtonWrapper>
      <UnionView pointerEvents={'none'}>
        <Image source={union} alt="배경" />
      </UnionView>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 81.5px;
  background-color: transparent;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f5f5f5;
  flex-grow: 1;
`;
const BottomTabBarButton = styled(TouchableOpacity)`
  margin: auto;
  box-sizing: content-box;
  background-color: #f5f5f5;
`;
const UnionView = styled.View`
  right: 0;
  background-color: transparent;
`;
