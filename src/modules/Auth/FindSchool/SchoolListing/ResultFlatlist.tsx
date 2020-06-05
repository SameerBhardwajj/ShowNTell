import * as React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { vh, Colors, Images, vw } from "../../../../utils";

export interface AppProps {
  item: any;
  index: string;
  onPress: Function;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={Styles.textView}
      onPress={() => props.onPress()}
    >
      <Image style={Styles.img} source={Images.Location_icon_Grey} />
      <Text numberOfLines={1} style={Styles.text}>
        {props.item.name}
      </Text>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  textView: {
    paddingVertical: vh(15),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'white'
  },
  text: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightGrey,
    paddingLeft: vw(10),
  },
  img: {
    height: vh(20),
    width: vh(15),
  },
});
