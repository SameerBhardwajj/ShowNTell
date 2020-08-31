import * as React from "react";
import {
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { Images, Colors, CommonFunctions, Constants, vh } from "../../utils";
import { updateSplash } from "./action";
import { addDeviceToken } from "../Auth/Login/action";
import { hitChatCount } from "../Home/action";

export interface AppProps {
  navigation?: any;
}
export default function App(props: AppProps) {
  const { deviceToken, loginToken } = useSelector((state: { Login: any }) => ({
    deviceToken: state.Login.deviceToken,
    loginToken: state.Login.loginToken,
  }));
  const dispatch = useDispatch();
  React.useEffect(() => {
    Constants.setAuthorizationToken(
      loginToken.length === 0 ? false : true,
      loginToken
    );
    CommonFunctions.isNullUndefined(deviceToken)
      ? dispatch(addDeviceToken(() => {}))
      : null;
    dispatch(updateSplash());
    loginToken.length === 0
      ? SplashScreen.hide()
      : dispatch(
          hitChatCount(() => {
            SplashScreen.hide();
          })
        );
  }, []);
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.violet} />
      <View
        style={{
          height: vh(300),
          width: vh(300),
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: vh(20),
        }}
      >
        <Image
          source={Images.SNT_head_icon}
          style={{ height: vh(200), width: vh(200) }}
          resizeMethod="resize"
          resizeMode="center"
        />
      </View>
    </ImageBackground>
  );
}
const Styles = StyleSheet.create({
  mainImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
