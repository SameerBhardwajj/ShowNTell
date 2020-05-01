import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <Text>Under Development</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
