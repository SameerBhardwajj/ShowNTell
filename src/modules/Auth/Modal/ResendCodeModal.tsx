import * as React from "react";
import { View, Text, StyleSheet, Image, BackHandler } from "react-native";

// custom imports
import {
  Images,
  vw,
  Strings,
  vh,
  Colors,
  CommonFunctions,
} from "../../../utils";
import { CustomButton } from "../../../Components";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { params } = props.route;
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  }, []);
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Image source={Images.Confirmation_check_Icon} style={Styles.img} />
        {CommonFunctions.isNullUndefined(params.heading) ? null : (
          <Text style={Styles.headingMsgText}>{params.heading}</Text>
        )}
        <Text style={Styles.bubbleMsgText}>
          {params.msg === undefined ? Strings.acsess_code_confirm : params.msg}
        </Text>
        <CustomButton
          Text={Strings.ok}
          onPress={() =>
            params.path === undefined
              ? props.navigation.pop(2)
              : props.navigation.navigate(params.path)
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
    marginBottom: vh(32),
  },
  headingMsgText: {
    marginBottom: vh(10),
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    textAlign: "center",
  },
  bubbleMsgText: {
    marginBottom: vh(32),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(17),
    textAlign: "center",
  },
});
