import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Image source={Images.character_Description} style={Styles.img} />
        <Text style={Styles.bubbleText}>{Strings.Bubbles}</Text>
        <Text style={Styles.bubbleMsgText}>{Strings.bubbleMsg}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.cancelBtn}
          onPress={() => props.navigation.pop()}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    borderRadius: vw(10),
    paddingVertical: vw(40),
    paddingHorizontal: vw(18),
  },
  cancelBtn: {
    position: "absolute",
    padding: vh(24),
    right: 0,
  },
  img: {
    height: vh(180),
    width: vh(180),
  },
  bubbleText: {
    color: Colors.waterBlue,
    fontFamily: "Nunito-Bold",
    fontSize: vh(24),
    paddingTop: vh(30),
    paddingBottom: vh(10),
  },
  bubbleMsgText: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    textAlign: "center",
  },
});
