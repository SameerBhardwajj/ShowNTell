import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { vh, vw, Colors, Images } from "../../../utils";
import moment from "moment";

export interface AppProps {
  item: any;
  index: string;
  current: number;
  setCurrent: Function;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        Styles.mainView,
        {
          backgroundColor:
            props.current === parseInt(props.index)
              ? Colors.fadedPink
              : "white",
          borderColor:
            props.current === parseInt(props.index)
              ? Colors.fadedPink
              : Colors.borderGrey,
        },
      ]}
      onPress={() => props.setCurrent(props.index)}
    >
      <Text style={Styles.myText}>
        {moment.utc(props.item.time).format("hh:mm A")}
      </Text>
      {props.current === parseInt(props.index) ? (
        <Image source={Images.Tick_Icon} style={{ marginHorizontal: vw(20) }} />
      ) : null}
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    borderWidth: vw(1),
    paddingVertical: vh(11),
    borderRadius: vh(5),
    marginVertical: vh(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingHorizontal: vw(20),
  },
});
