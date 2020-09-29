import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { vh, vw, Colors, ScreenName } from "../utils";

export interface AppProps {
  item: any;
  onPress: Function;
}

export default function App(props: AppProps) {
  const { unreadMsgs } = useSelector((state: { Home: any }) => ({
    unreadMsgs: state.Home.unreadMsgs,
  }));
  return (
    <TouchableOpacity
      style={Styles.mainView}
      activeOpacity={0.8}
      onPress={() => props.onPress(props.item.path)}
    >
      <Image
        source={props.item.icon}
        style={[props.item.size, { marginRight: vw(15) }]}
      />
      <View style={Styles.textView}>
        <Text style={Styles.label}>{props.item.label}</Text>
        {props.item.path === ScreenName.CHAT && unreadMsgs > 0 ? (
          <View style={Styles.dot}>
            <Text style={Styles.dotTxt}>{unreadMsgs}</Text>
          </View>
        ) : null}
      </View>
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
  dotTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(12),
    color: "white",
  },
  textView: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dot: {
    height: vh(20),
    width: vh(20),
    borderRadius: vh(10),
    backgroundColor: Colors.chatOrange,
    alignItems: "center",
    justifyContent: "center",
  },
});
