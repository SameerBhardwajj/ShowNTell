import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, vw, vh, Images } from "../utils";

export interface AppProps {
  viewStyle?: any;
}

export default function App(props: AppProps) {
  return (
    <View style={[Styles.cartoonView, props.viewStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        // style={{ marginTop: vh(13) }}
      >
        <Image
          source={Images.Lionstein_holding_glasses}
          resizeMode="contain"
          resizeMethod="resize"
          style={Styles.img1}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginTop: vh(20), marginLeft: vw(30) }}
      >
        <Image
          source={Images.Penny_Waving}
          resizeMode="contain"
          resizeMethod="resize"
          style={Styles.img2}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={{ marginTop: vh(40), marginRight: vw(20) }}
      >
        <Image
          source={Images.MissChievous_Bouncing_On_Tail}
          resizeMode="contain"
          resizeMethod="resize"
          style={Styles.img3}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1}>
        <Image
          source={Images.Bubbles_Waving}
          resizeMode="contain"
          resizeMethod="resize"
          style={Styles.img4}
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
    width: vw(330),
    // backgroundColor: 'red'
  },
  img1: {
    // backgroundColor: 'blue',
    height: vh(200),
    width: vw(150),
  },
  img2: {
    // backgroundColor: 'blue',
    height: vh(200),
    width: vw(200),
  },
  img3: {
    // backgroundColor: 'blue',
    height: vh(170),
    width: vw(170),
  },
  img4: {
    // backgroundColor: 'blue',
    height: vh(180),
    width: vw(200),
  },
});
