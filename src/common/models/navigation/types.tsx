import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/*
 *
 * Stack Param Lists
 *
 */
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type LoggedInTabParamList = {
  Home: undefined;
  Calendar: NavigatorScreenParams<CalendarStackParamList>;
  MyPet: undefined;
  // Complete: {calendarId: string};
};

export type CalendarStackParamList = {
  CalendarScreen: undefined;
  CalendarFormScreen: {item: undefined};
};

export type MyPetStackParamList = {
  MyPetsUserInfoScreen: undefined;
  SettingMenuScreen: undefined;
  AccountSettingMenuScreen: undefined;
};

/*
 *
 * Stack Screen Props
 *
 */
export type CalendarStackScreenProps<T extends keyof CalendarStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CalendarStackParamList, T>,
    BottomTabScreenProps<LoggedInTabParamList, 'Calendar'>
  >;

export type MyPetStackScreenProps<T extends keyof MyPetStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MyPetStackParamList, T>,
    BottomTabScreenProps<LoggedInTabParamList, 'MyPet'>
  >;
