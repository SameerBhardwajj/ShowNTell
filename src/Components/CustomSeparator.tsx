import * as React from "react";
import { View } from "react-native";
import { vw, vh, Colors } from "../utils";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <View
      style={{
        height: vw(1),
        width: "100%",
        alignSelf: "center",
        backgroundColor: Colors.separator,
        margin: vh(10),
      }}
    />
  );
}
