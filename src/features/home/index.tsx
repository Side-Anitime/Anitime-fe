import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>홈</Text>
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
