import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../../utils";
import { CustomButton } from "../../../Components";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { params } = props.route;
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Image source={Images.Confirmation_check_Icon} style={Styles.img} />
        <Text style={Styles.bubbleMsgText}>
          {props.route.params.msg === undefined
            ? Strings.acsess_code_confirm
            : props.route.params.msg}
        </Text>
        <CustomButton
          Text={Strings.ok}
          onPress={() =>
            params.path === undefined
              ? props.navigation.pop(2)
              : props.navigation.navigate(params.path, { type: params.type })
          }
        />
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
    height: vh(80),
    width: vh(80),
  },
  bubbleMsgText: {
    marginVertical: vh(32),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    textAlign: "center",
  },
});
