import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Colors, vh, Images, vw } from "../utils";

export interface AppProps {
  title: string;
  onPressBack: Function;
  notify?: boolean;
  notifyNumber?: number;
}

const iPhoneX = Dimensions.get("window").height >= 812;

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainOuterView}>
      <View style={Styles.extraHeader} />
      <View style={Styles.mainView}>
        <Text style={Styles.text}>{props.title}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.btnView}
          onPress={() => props.onPressBack()}
        >
          <Image source={Images.back_icon} style={Styles.btn} />
        </TouchableOpacity>
        {props.notify ? (
          <View style={Styles.notifyView}>
            <Text style={Styles.notifyText}>{props.notifyNumber}/3</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainOuterView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    backgroundColor: Colors.violet,
    alignItems: "center",
    justifyContent: "center",
    height: vh(70),
    width: "100%",
    paddingTop: vh(20),
  },
  extraHeader: {
    backgroundColor: Colors.violet,
    width: "100%",
    height: iPhoneX ? vh(10) : 0,
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: "white",
  },
  btnView: {
    position: "absolute",
    padding: vh(16),
    alignSelf: "flex-start",
  },
  btn: {
    marginTop: vh(18),
    height: vw(20),
    width: vw(15)
  },
  newView: {
    position: "absolute",
    padding: vh(16),
    alignSelf: "flex-start",
  },
  notifyView: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "white",
    height: vh(31),
    width: vw(60),
    top: iPhoneX ? vh(40) : vh(30),
    right: vh(16),
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  notifyText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    color: Colors.pink,
  },
});
