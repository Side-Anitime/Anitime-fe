import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import ActionButton from '../../common/components/ActionButton/ActionButton';

function Home() {
  const onPressAddPetButton = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <Text>홈</Text>
      <ActionButton onPress={() => onPressAddPetButton()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Home;
