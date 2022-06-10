import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Center, Image} from 'native-base';
import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import union from '../asstes/UI/rounded_edge_bottom_tab.png';

interface Props extends BottomTabBarProps {}

export default function BottomTabBar(props: Props) {
  return (
    <Wrapper>
      {/* <TabImage source={union} alt="i" /> */}
      <TabWrapper>
        {props.state.routes.map((route, index) => {
          const {options, render} = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = props.state.index === index;

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

          return (
            <TabItem
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <Center>
                <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                  {label}
                </Text>
              </Center>
            </TabItem>
          );
        })}
      </TabWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.View`
  height: 100%;
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 100px;
  width: 100%;
  height: 81.5px;
`;

const TabItem = styled(TouchableOpacity)`
  margin: auto;
  bottom: 0px;
  right: 0px;
`;

const TabWrapper = styled.View`
  position: absolute;
  flex-direction: row;
  height: 81.5px;
  width: 270px;
  background-color: #f5f5f5;
`;
