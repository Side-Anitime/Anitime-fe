import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {useListPlan} from '../../common/api/calendar';
import {camera, dday} from '../../common/assets';
import ActionButton from '../../common/components/ActionButton/ActionButton';
import {getToday} from '../../common/utils/timeUtils';
import {selectUserToken} from '../auth/authSlice';

function Home() {
  const refRBSheet = useRef<RBSheet>(null);
  const onPressAddHomeButton = () => {};
  useEffect(() => {
    refRBSheet.current?.open();
  });
  const userToken = useSelector(selectUserToken);
  const today = {
    year: getToday('YYYY'),
    month: getToday('MM'),
    day: getToday('DD'),
  };
  const {data: result} = useListPlan(userToken, today);
  const [adjHeight, setAdjHeight] = useState<string | number>('50%');

  useEffect(() => {
    if (!result?.data) {
      return;
    }
    // bottomtabbar height = 70
    // title height = 60
    const baseHeight = 70 + 60;
    setAdjHeight(60 * result.data.length + baseHeight);
  }, [result]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.cameraBtn}>
        <Image source={camera} />
      </TouchableOpacity>
      <View style={{...styles.calendarWrapper, height: adjHeight}}>
        <View style={(styles.calendarTitle, styles.calendarBlocks)}>
          <Image source={dday} />
          <Text style={{marginLeft: 20}}>
            오늘 일정이
            {result && result.data && result.data.length > 0
              ? ' 있어요'
              : ' 없어요'}
          </Text>
        </View>
        {result?.data?.map(() => (
          <View style={styles.calendarBlocks}>
            {/* <Image source={dday} /> */}
            <Text>9월 25일 토 AM 8:00</Text>
          </View>
        ))}
      </View>
      {/* <ActionButton onPress={() => onPressAddHomeButton()} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  cameraBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  calendarBlocks: {
    padding: 16,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#fafafa',
  },
  calendarWrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#ffffff',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: 'flex',
    paddingTop: 4,
  },
  calendarTitle: {
    height: 60,
  },
});

export default Home;
