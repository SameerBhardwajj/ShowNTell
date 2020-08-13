import React, { useState } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import { getUniqueId } from "react-native-device-info";

// custom imports
import {
  vw,
  Strings,
  vh,
  Colors,
  ScreenName,
  API,
  EndPoints,
} from "../../../utils";
import { CustomButton, CustomToast, CustomLoader } from "../../../Components";
import { updateLogin, updateProfilePic, logout } from "../Login/action";
import { updateClassChild } from "../../ClassroomSchedule/action";
import { updateChild } from "../../Home/action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  }, []);
  return (
    <View style={Styles.mainView}>
      <CustomLoader loading={isLoading} color="white" />
      <View style={Styles.modalView}>
        <Text style={Styles.bubbleMsgText}>{Strings.logout_msg}</Text>
        <CustomButton
          Text={Strings.Yes_Logout}
          onPress={() => {
            setLoading(true);
            API.postApiCall(
              EndPoints.auth.logout,
              {
                device_id: getUniqueId(),
              },
              () => {
                dispatch(
                  updateChild({ child: 0, name: "All", classroom: 0 }, () => {})
                );
                dispatch(updateClassChild({}, () => {}));
                dispatch(updateProfilePic("", () => {}));
                dispatch(updateLogin({}, ""));
                dispatch(logout());
                setLoading(false);
              },
              (error: any) => {
                setLoading(false), CustomToast(error.data.message);
              }
            );
          }}
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
