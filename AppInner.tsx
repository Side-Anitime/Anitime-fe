import MyPet from './src/features/mypet/components';
import Home from './src/features/home';
import Calendar from './src/features/calendar/components';
import GuideScreen from './src/features/auth/component/GuideScreen';
import * as React from 'react';
import {useState} from 'react';
import {Image, NativeBaseProvider} from 'native-base';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RootStackParamList, LoggedInTabParamList} from './src/common/models';

import SignUpScreen from './src/features/auth/component/SignUpScreen';
import styled from 'styled-components/native';
import BottomTabBar from './src/common/components/BottomTabBar';
import {
  home,
  schedule,
  schedule_off,
  mypet,
  mypet_off,
  home_off,
} from './src/common/asstes/';

const Tab = createBottomTabNavigator<LoggedInTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFB933',
    background: '#FAFAFA',
  },
};

function AppInner() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        {isLoggedIn ? (
          <BottomTab
            tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: '홈',
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                  return <Image source={home} alt="홈" />;
                },
              }}
            />
            <Tab.Screen
              name="Calendar"
              component={Calendar}
              options={{
                title: '캘린더',
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                  return <Image source={schedule} alt="캘린더" />;
                },
              }}
            />
            <Tab.Screen
              name="MyPet"
              component={MyPet}
              options={{
                title: '마이펫',
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                  return <Image source={mypet} alt="마이펫" />;
                },
              }}
            />
          </BottomTab>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="GuideScreen"
              component={GuideScreen}
              options={{title: '가이드', headerShown: false}}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{title: '회원가입', headerShown: true}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const BottomTab = styled(Tab.Navigator)``;

export default AppInner;
