import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { vh, vw, Colors } from "../utils";

export interface AppProps {
  item: any;
  onPress: Function;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      style={Styles.mainView}
      activeOpacity={0.8}
      onPress={() => props.onPress()}
    >
      <Image
        source={props.item.icon}
        style={[props.item.size, { marginRight: vw(15) }]}
      />
      <Text style={Styles.label}>{props.item.label}</Text>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    flexDirection: "row",
  },
  label: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    color: Colors.lightBlack,
  },
});
