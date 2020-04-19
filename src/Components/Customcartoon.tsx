import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, vw, vh, Images } from "../utils";

export interface AppProps {
  viewStyle?: any;
  navigation?: any;
  small: boolean;
}

export default function App(props: AppProps) {
  const { small } = props;
  return (
    <View
      style={[
        Styles.cartoonView,
        props.viewStyle,
        { width: small ? vw(250) : vw(330) },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginTop: small ? vh(12) : vh(2) }}
      >
        <Image
          source={Images.Lionstein_holding_glasses}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            height: small ? vh(152) : vh(192),
            width: small ? vw(110) : vw(150),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginTop: small ? vh(29) : vh(19), marginLeft: vw(30) }}
      >
        <Image
          source={Images.Penny_Waving}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            height: small ? vh(150) : vh(200),
            width: small ? vw(150) : vw(200),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginTop: small ? vh(50) : vh(40), marginRight: vw(20) }}
      >
        <Image
          source={Images.MissChievous_Bouncing_On_Tail}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            height: small ? vh(120) : vh(170),
            width: small ? vw(120) : vw(170),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate("Modal")}
        style={{ marginTop: small ? vh(12) : vh(2) }}
      >
        <Image
          source={Images.Bubbles_Waving}
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            height: small ? vh(140) : vh(180),
            width: small ? vw(150) : vw(200),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  cartoonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: vh(150),
  },
});
