import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { vh, Strings, vw, Colors } from "../utils";

export interface AppProps {
  check: boolean;
  titleText: string;
  onPress: Function;
  value: string;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.dobView}>
      <View style={Styles.textView}>
        <Text
          style={[
            Styles.titleTxt,
            { color: props.check ? Colors.titleColor : Colors.pink },
          ]}
        >
          {props.titleText}
        </Text>
        {props.check ? null : (
          <Text style={Styles.incorrectText}>{Strings.DOB_incorrect}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[
          Styles.inputTxt,
          { borderColor: props.check ? Colors.borderGrey : Colors.pink },
        ]}
        activeOpacity={0.8}
        onPress={() => props.onPress()}
      >
        <Text style={Styles.dobText}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  incorrectText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.pink,
    paddingLeft: vw(40),
  },
  inputTxt: {
    height: vh(48),
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
    width: "100%",
    marginTop: vh(10),
    marginBottom: vh(15),
    backgroundColor: Colors.veryLightGrey,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dobText: {
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
  },
  dobView: {
    alignItems: "center",
    width: "100%",
    marginTop: vh(5),
  },
});
