import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Home() {
  return (
    <View>
      <Icon name="home" size={24} color="#000000" />
      <Text>
        Home
      </Text>
    </View>
  );
}
export default Home;
