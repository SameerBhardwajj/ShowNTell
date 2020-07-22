import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

// Custom imports
import { CustomHeader } from "../../Components";
import { Strings, vh, vw, Colors } from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Notification}
        onPressBack={() => props.navigation.pop()}
      />
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerView: {
    backgroundColor: Colors.violet,
    alignItems: "center",
    justifyContent: "center",
    height: vh(70),
    width: "100%",
    paddingTop: vh(20),
    flexDirection: "row",
  },
});
