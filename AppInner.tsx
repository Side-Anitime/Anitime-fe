import MyPet from './src/features/mypet/components';
import Home from './src/features/home';
import Calendar from './src/features/calendar/components';
import GuideScreen from './src/features/auth/component/GuideScreen';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
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
} from './src/common/assets';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectLoading, setLoading} from './src/features/loading/loadingSlice';
import LoadingOverlay from './src/features/loading/LoadingOverlay';
import {useIsMutating, useIsFetching} from '@tanstack/react-query';
import {useAppDispatch} from './src/app/store';
import CompleteOverlay from './src/features/loading/CompleteOverlay';

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
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const dispatch = useAppDispatch();

  //로딩 관리. 캘린더도 함께 사용할 경우 ['pet'] param 삭제 or 원하는 query key 추가
  const isLoading = useSelector(selectLoading);
  const isFetchingPet = useIsFetching(['pet']);
  const isMutatingPet = useIsMutating(['pet']);

  useEffect(() => {
    if (isFetchingPet || isMutatingPet) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isFetchingPet, isMutatingPet]);

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={MyTheme}>
        {isLoggedIn ? (
          <BottomTabNavigator
            tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: '홈',
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                  if (!focused) {
                    return <Image source={home_off} />;
                  }
                  return <Image source={home} />;
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
                  if (!focused) {
                    return <Image source={schedule_off} />;
                  }
                  return <Image source={schedule} />;
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
                  if (!focused) {
                    return <Image source={mypet_off} />;
                  }
                  return <Image source={mypet} />;
                },
              }}
            />
          </BottomTabNavigator>
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
        {isLoading && <LoadingOverlay />}
        {isComplete && <CompleteOverlay />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const BottomTabNavigator = styled(Tab.Navigator)``;

export default AppInner;
