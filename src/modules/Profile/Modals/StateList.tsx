import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { vh, Colors } from "../../../utils";

export interface AppProps {
  item: any;
  index: string;
  onPress: Function;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      style={Styles.mainView}
      activeOpacity={1}
      onPress={() => props.onPress()}
    >
      <Text style={Styles.nameText}>{props.item.state_name}</Text>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: vh(10),
  },
  nameText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightBlack,
  },
});
