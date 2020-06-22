import * as React from "react";
import { View, Text } from "react-native";
import { vh, Colors, Strings } from "../utils";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontFamily: "Nunito-Bold",
          fontSize: vh(16),
          color: Colors.violet,
        }}
      >
        {Strings.No_data_Found}
      </Text>
    </View>
  );
}
