import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Center, Image} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import union from '../asstes/UI/union.png';

interface Props extends BottomTabBarProps {}

export default function BottomTabBar(props: Props) {
  return (
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
      <AddView>{/* <TabImage source={union} alt="i" /> */}</AddView>
    </TabWrapper>
  );
}

const TabImage = styled(Image)`
  top: -45px;
  width: 125px;
  height: 90px;
`;

const TabItem = styled(TouchableOpacity)`
  flex: 1;
  margin: auto;
`;
const AddView = styled.View`
  width: 144px;
`;
const TabWrapper = styled.View`
  flex-direction: row;
  height: 68px;
`;
