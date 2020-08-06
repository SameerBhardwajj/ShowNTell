import * as React from "react";
import { ImageBackground, Image, StatusBar, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { Images, Colors, CommonFunctions } from "../../utils";
import { updateSplash } from "./action";
import { addDeviceToken } from "../Auth/Login/action";

export interface AppProps {
  navigation?: any;
}
export default function App(props: AppProps) {
  const { deviceToken } = useSelector((state: { Login: any }) => ({
    deviceToken: state.Login.deviceToken,
  }));
  const dispatch = useDispatch();
  React.useEffect(() => {
    CommonFunctions.isNullUndefined(deviceToken)
      ? dispatch(addDeviceToken(() => {}))
      : null;
    dispatch(updateSplash());
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <StatusBar barStyle={"light-content"} backgroundColor={Colors.violet} />
      <Image source={Images.Logo} />
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
