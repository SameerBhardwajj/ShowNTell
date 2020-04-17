import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, vh, Images, vw } from "../utils";

export interface AppProps {
  title: string;
  onPressBack: Function;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <Text style={Styles.text}>{props.title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.btnView}
        onPress={() => props.onPressBack()}
      >
        <Image source={Images.back_icon} style={Styles.btn} />
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.violet,
    alignItems: "center",
    justifyContent: "center",
    height: vh(70),
    width: "100%",
    paddingTop: vh(20),
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: "white",
  },
  btnView: {
    position: "absolute",
    padding: vh(16),
    alignSelf: "flex-start",
  },
  btn: {
    marginTop: vh(20),
  },
});
