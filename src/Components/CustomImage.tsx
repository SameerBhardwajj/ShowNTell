import * as React from "react";
import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";

export interface AppProps {
  style?: object;
  uri: string;
  resizeMode?: any;
}

export default function App(props: AppProps) {
  return (
    <FastImage
      style={props.style}
      source={{
        uri: props.uri,
        // headers: { Authorization: "someAuthToken" },
        // priority: FastImage.priority.normal,
      }}
      resizeMode={props.resizeMode}
    />
  );
}
