import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {camera, dday} from '../../common/assets';
import ActionButton from '../../common/components/ActionButton/ActionButton';

function Home() {
  const refRBSheet = useRef<RBSheet>(null);
  const onPressAddHomeButton = () => {};
  useEffect(() => {
    refRBSheet.current?.open();
  });
  const [adjHeight, setAdjHeight] = useState<string | number>('50%');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.cameraBtn}>
        <Image source={camera} />
      </TouchableOpacity>
      <View style={{...styles.calendarWrapper, height: adjHeight}}>
        <View style={(styles.calendarTitle, styles.calendarBlocks)}>
          <Image source={dday} />
          <Text>오늘 일정이 있어요</Text>
        </View>
        <View style={styles.calendarBlocks}>
          {/* <Image source={dday} /> */}
          <Text>9월 25일 토 AM 8:00</Text>
        </View>
        <View style={styles.calendarBlocks}>
          {/* <Image source={dday} /> */}
          <Text>9월 25일 토 AM 8:00</Text>
        </View>
      </View>
      <ActionButton onPress={() => onPressAddHomeButton()} />
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
    top: 10,
    right: 10,
  },
  calendarBlocks: {
    padding: 15,
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
    paddingTop: 10,
  },
  calendarTitle: {},
});

export default Home;
