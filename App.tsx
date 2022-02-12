import * as React from 'react';
import AppInner from './AppInner';
import {Provider} from 'react-redux';
import store from './src/app/store';

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

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
