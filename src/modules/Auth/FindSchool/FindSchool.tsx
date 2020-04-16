import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => props.navigation.pop()}>
        <Text>Find School</Text>
      </TouchableOpacity>
    </View>
  );
}
