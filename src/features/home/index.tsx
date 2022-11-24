import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
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
import {formatStringToString, getToday} from '../../common/utils/timeUtils';
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
    // title/block height = 60
    const calHeight = 60 * result.data.length + 70 + 60;
    const maxHeight = 400;

    if (calHeight > maxHeight) {
      setAdjHeight(maxHeight);
    } else {
      setAdjHeight(calHeight);
    }
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
              ? '있어요'
              : '없어요'}
          </Text>
        </View>
        <FlatList
          bounces
          data={result?.data}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 200}} />}
          renderItem={({item, index}) => {
            return (
              <>
                <View style={styles.calendarBlocks}>
                  <Text>
                    {formatStringToString(item.startDate, 'hh:mm:ss a')}
                    {item.title}
                  </Text>
                </View>
              </>
            );
          }}
        />
      </View>
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
