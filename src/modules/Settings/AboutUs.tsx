import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomHeader } from "../../Components";
import { Strings, vh } from "../../utils";

export interface AppProps {
  navigation: any;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.About}
        onPressBack={() => props.navigation.pop()}
      />
      <Text style={Styles.txt}></Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  txt: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    letterSpacing: -0.32,
  },
});
