import * as React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// custom imports
import { updateTab } from "../Home/action";
import { useDispatch, useSelector } from "react-redux";
import { vh, Colors, Images, vw, Strings } from "../../utils";
import { CustomHeader } from "../../Components";
import QODFlatList from "./QODFlatList";

const iPhoneX = Dimensions.get("window").height >= 812;
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
