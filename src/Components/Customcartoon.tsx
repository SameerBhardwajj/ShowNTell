import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { vw, vh, Images, ScreenName } from "../utils";

export interface AppProps {
  navigation?: any;
  small: boolean;
}

export default function App(props: AppProps) {
  const { small } = props;

  const h1 = small ? vh(130) : vh(150);
  const w1 = small ? vw(90) : vw(100);
  const h2 = small ? vh(140) : vh(150);
  const w2 = small ? vw(85) : vw(105);
  const h3 = small ? vh(115) : vh(130);
  const w3 = small ? vw(60) : vw(65);
  const h4 = small ? vh(150) : vh(160);
  const w4 = small ? vw(140) : vw(150);

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.MODAL, { type: 1 })}
        style={{
          height: small ? vh(125) : vh(142),
          alignSelf: "flex-end",
        }}
      >
        <Image
          source={Images.Lionstein_holding_glasses}
          style={{ height: h1, width: w1 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.MODAL, { type: 2 })}
        style={{
          height: small ? vh(117) : vh(127),
          width: small ? vw(75) : vw(85),
          alignSelf: "flex-end",
        }}
      >
        <Image source={Images.Penny_Waving} style={{ height: h2, width: w2 }} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.MODAL, { type: 3 })}
        style={{
          height: small ? vh(100) : vh(113),
          width: vw(65),
          alignSelf: "flex-end",
        }}
      >
        <Image
          source={Images.MissChievous_Bouncing_On_Tail}
          style={{ height: h3, width: w3 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.MODAL, { type: 4 })}
        style={{
          height: h4,
          alignSelf: "flex-end",
        }}
      >
        <Image
          source={Images.Bubbles_Waving}
          style={{ height: h4, width: w4 }}
        />
      </TouchableOpacity>
    </View>
  );
}
