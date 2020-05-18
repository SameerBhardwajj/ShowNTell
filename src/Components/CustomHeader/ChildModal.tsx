import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// custom imports
import { vw, vh, Colors } from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          style={Styles.btnView}
          activeOpacity={0.8}
          onPress={() => props.navigation.pop()}
        >
          <Text style={Styles.nameText}>Alex Parish</Text>
        </TouchableOpacity>
        <View style={Styles.separatorView} />
        <TouchableOpacity
          style={Styles.btnView}
          activeOpacity={0.8}
          onPress={() => props.navigation.pop()}
        >
          <Text style={Styles.nameText}>Ryan Parish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: vw(10),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    textAlign: "center",
    paddingVertical: vh(40),
  },
  separatorView: {
    height: vw(1),
    width: "90%",
    backgroundColor: Colors.separator,
  },
  btnView: {
    width: "100%",
  },
});
