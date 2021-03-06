import * as React from "react";
import { View, Text, StyleSheet, Image, BackHandler } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors, ScreenName } from "../../../utils";
import { CustomButton } from "../../../Components";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  },[])
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <Image source={Images.Lock_Graphic} style={Styles.img} />
        <Text style={Styles.bubbleMsgText}>
          {Strings.Password_successfully_created}
        </Text>
        <CustomButton
          Text={Strings.Back_to_Login}
          onPress={() => props.navigation.navigate(ScreenName.LOGIN)}
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
    height: vh(125),
    width: vh(85),
  },
  bubbleMsgText: {
    marginVertical: vh(32),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    textAlign: "center",
  },
});
