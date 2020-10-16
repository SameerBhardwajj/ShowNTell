import * as React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Colors, vw, vh } from "../utils";

export interface AppProps {
  Text: string;
  ButtonStyle?: any;
  TextStyle?: any;
  onPress: Function;
  activeOpacity?: number;
  lightBtn?: boolean;
  btnColor?: string;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      style={[
        Styles.btn,
        {
          backgroundColor: props.lightBtn
            ? "white"
            : props.btnColor === undefined
            ? Colors.violet
            : props.btnColor,
          borderWidth: props.lightBtn ? vw(3) : 0,
          borderColor:
            props.btnColor === undefined ? Colors.violet : props.btnColor,
        },
        props.ButtonStyle,
      ]}
      activeOpacity={
        props.activeOpacity === undefined ? 0.8 : props.activeOpacity
      }
      onPress={() => props.onPress()}
    >
      <Animated.Text
        style={[
          Styles.btnText,
          {
            color: props.lightBtn
              ? props.btnColor === undefined
                ? Colors.violet
                : props.btnColor
              : "white",
          },
          props.TextStyle,
        ]}
      >
        {props.Text}
      </Animated.Text>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "85%",
    height: vh(48),
    alignItems: "center",
    justifyContent: "center",
    margin: vw(14),
    marginHorizontal: vw(20),
    borderRadius: vw(50),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
});
