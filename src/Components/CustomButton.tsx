import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, vw, vh } from "../utils";

export interface AppProps {
  Text: string;
  ButtonStyle?: any;
  TextStyle?: any;
  onPress: Function;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[Styles.btn, props.ButtonStyle]}
      onPress={() => props.onPress()}
    >
      <Text style={[Styles.btnText, props.TextStyle]}>{props.Text}</Text>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: vh(48),
    width: "80%",
    margin: vw(14),
    marginHorizontal: vw(20),
    backgroundColor: Colors.violet,
    borderRadius: vw(50),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    color: "white",
    fontSize: vh(16),
  },
});
