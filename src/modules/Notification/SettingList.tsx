import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { vh, Images } from "../../utils";

export interface AppProps {
  name: any;
  value: any;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={Styles.mainView}
      onPress={() => {}}
    >
      <Text style={Styles.headingText}>{props.name}</Text>
      <Image source={props.value ? Images.Toggle_on : Images.Toggle_on} />
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
    paddingVertical: vh(14),
  },
});
