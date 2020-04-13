import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('TabNavigator')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('FindSchool')}>
        <Text>Search Nearby Schools</Text>
      </TouchableOpacity>
    </View>
  );
}
