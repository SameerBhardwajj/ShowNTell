import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  let value = props.route.params.type;
  let data: any;

  switch (value) {
    case 1:
      data = {
        img: Images.Lionstein_holding_glasses,
        name: Strings.Lionstein,
        msg: Strings.lionMsg,
      };
      break;
    case 2:
      data = {
        img: Images.Penny_Waving,
        name: Strings.Penny_Polite,
        msg: Strings.pennyMsg,
      };
      break;
    case 3:
      data = {
        img: Images.MissChievous_Bouncing_On_Tail,
        name: Strings.Miss_Chievous,
        msg: Strings.missMsg,
      };
      break;
    case 4:
      data = {
        img: Images.Bubbles_Waving,
        name: Strings.Bubbles,
        msg: Strings.bubbleMsg,
      };
      break;
  }

  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Image source={data.img} style={Styles.img} />
        <Text style={Styles.bubbleText}>{data.name}</Text>
        <Text style={Styles.bubbleMsgText}>{data.msg}</Text>
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
    width: vh(150),
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
