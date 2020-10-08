import * as React from "react";
import { View, Text } from "react-native";
import { vh, Colors, Strings, CommonFunctions } from "../utils";

export interface AppProps {
  text?: string;
}

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
        {CommonFunctions.isNullUndefined(props.text)
          ? Strings.No_data_Found
          : props.text}
      </Text>
    </View>
  );
}
