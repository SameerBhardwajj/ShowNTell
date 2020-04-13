import * as React from 'react';
import {View, Text} from 'react-native';

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
      <Text>Photo Gallery</Text>
    </View>
  );
}
