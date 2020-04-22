import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, vw, vh } from "../utils";

export interface AppProps {
  Text: string;
  ButtonStyle?: any;
  TextStyle?: any;
  onPress: Function;
  activeOpacity?: number;
  lightBtn?: boolean;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      activeOpacity={
        props.activeOpacity === undefined ? 0.8 : props.activeOpacity
      }
      style={[
        Styles.btn,
        {
          backgroundColor: props.lightBtn ? "white" : Colors.violet,
          borderWidth: props.lightBtn ? vw(3) : 0,
        },
        props.ButtonStyle,
      ]}
      onPress={() => props.onPress()}
    >
      <Text
        style={[
          Styles.btnText,
          { color: props.lightBtn ? Colors.violet : "white" },
          props.TextStyle,
        ]}
      >
        {props.Text}
      </Text>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: vh(48),
    width: "85%",
    margin: vw(14),
    marginHorizontal: vw(20),
    borderRadius: vw(50),
    borderColor: Colors.violet,
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
});
