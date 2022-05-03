import MyPet from './src/features/mypet/components';
import Home from './src/features/home';
import Calendar from './src/features/calendar/components';
import SignIn from './src/features/auth/SignIn';
import SignUp from './src/features/auth/SignUp';
import * as React from 'react';
import {useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList, LoggedInTabParamList} from './src/common/models';

const Tab = createBottomTabNavigator<LoggedInTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{title: '홈'}} />
            <Tab.Screen
              name="Calendar"
              component={Calendar}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="MyPet"
              component={MyPet}
              options={{title: '마이펫', headerShown: false}}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: '로그인', headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{title: '회원가입'}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default AppInner;
