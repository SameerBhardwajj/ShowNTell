import * as React from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { useDispatch } from "react-redux";

// custom imports
import { vw, Strings, vh, Colors, ScreenName } from "../../../utils";
import { CustomButton } from "../../../Components";
import { updateLogin } from "../Login/action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  },[])
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Text style={Styles.bubbleMsgText}>{Strings.logout_msg}</Text>
        <CustomButton
          Text={Strings.Yes_Logout}
          onPress={() => dispatch(updateLogin({}, ""))}
        />
        <CustomButton
          Text={Strings.No}
          lightBtn={true}
          onPress={() => props.navigation.navigate(ScreenName.TAB_NAVIGATOR)}
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
  bubbleMsgText: {
    marginBottom: vh(32),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    textAlign: "center",
  },
});
