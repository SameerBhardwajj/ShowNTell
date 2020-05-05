import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScreenName } from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onPress={() => props.navigation.navigate(ScreenName.HOME)}
    >
      <Text>Press To Go Back</Text>
    </TouchableOpacity>
  );
}
