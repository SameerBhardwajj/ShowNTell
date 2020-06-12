import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { vh, Images } from "../../../utils";

export interface AppProps {
  index: string;
  item: any;
}

export default function App(props: AppProps) {
  const [check, setCheck] = useState(true);
  return (
    <View style={Styles.activityHeadView}>
      <View>
        <Text style={Styles.subActivityText}>{props.item.name}</Text>
      </View>
      <TouchableOpacity
        style={Styles.iconView}
        activeOpacity={0.8}
        onPress={() => setCheck(!check)}
      >
        <Image
          source={check ? Images.Check_Box_Active : Images.Check_Box_inactive}
          style={{ alignSelf: "center" }}
          resizeMode="center"
          resizeMethod="resize"
        />
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  activityHeadView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  subActivityText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
  iconView: {
    paddingHorizontal: vh(14),
    paddingVertical: vh(8),
    alignItems: "center",
    justifyContent: "center",
  },
});
