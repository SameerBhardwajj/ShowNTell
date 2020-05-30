import * as React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "../utils";

export interface AppProps {
  loading: boolean;
}

export default function App(props: AppProps) {
  if (props.loading) {
    return (
      <ActivityIndicator
        color={Colors.violet}
        size="large"
        animating={props.loading}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99,
        }}
      />
    );
  } else return null;
}
