import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, vw, vh, Images } from "../utils";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <View style={Styles.cartoonView}>
      <TouchableOpacity activeOpacity={0.8} style={{ marginTop: vh(13) }}>
        <Image source={Images.Lionstein_holding_glasses} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} style={{ marginTop: vh(28) }}>
        <Image source={Images.Penny_Waving} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} style={{ marginTop: vh(40) }}>
        <Image source={Images.MissChievous_Bouncing_On_Tail} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={Images.Bubbles_Waving} />
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  cartoonView: {
    marginLeft: vw(16),
    marginRight: vw(15),
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
