import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { vw, Colors, vh } from "../utils";

export interface AppProps {
  pressed: boolean;
  disabled: boolean;
  onPress: Function;
  time: string;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      activeOpacity={props.disabled ? 1 : 0.8}
      onPress={() => (props.disabled ? null : props.onPress())}
      style={[
        Styles.mainView,
        {
          backgroundColor: props.pressed ? Colors.fadedPink : "white",
          borderColor: props.pressed ? Colors.fadedPink : Colors.borderGrey,
        },
      ]}
    >
      <Text
        style={[
          Styles.myText,
          { color: props.disabled ? Colors.placeholderGrey : "black" },
        ]}
      >
        {props.time}
      </Text>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    borderWidth: vw(1),
    paddingVertical: vh(11),
    borderRadius: vh(5),
    paddingLeft: vw(20),
    marginVertical: vh(10),
  },
  myText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
});
