import * as React from 'react';
import { NativeBaseProvider } from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import MyPet from './src/features/mypet';
import Home from './src/features/home';
import Calendar from './src/features/calendar';
import SignIn from './src/features/auth/SignIn';
import SignUp from './src/features/auth/SignUp';

export type LoggedInParamList = {
  Home: undefined;
  Calendar: undefined;
  MyPet: undefined;
  Complete: {calendarId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
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
              name="Settings"
              component={MyPet}
              options={{title: '마이펫'}}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: '로그인'}}
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

export default App;
