import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onPress={() => props.navigation.navigate("Home")}
    >
      <Text>Press To Go Back</Text>
    </TouchableOpacity>
  );
}
