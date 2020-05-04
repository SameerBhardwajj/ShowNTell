import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, vh, Colors } from "../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { params } = props.route;

  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Image source={Images.Activity_Detail_Graphic} style={Styles.img} />
        <Text style={Styles.bubbleText}>{params.name}</Text>
        <Text style={Styles.bubbleMsgText}>{params.msg}</Text>
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
    height: vh(120),
    width: vh(120),
  },
  bubbleText: {
    color: Colors.lightBlack,
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    paddingTop: vh(28),
    paddingBottom: vh(16),
  },
  bubbleMsgText: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    color: Colors.lightBlack,
  },
});
