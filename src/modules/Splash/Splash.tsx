import * as React from "react";
import { ImageBackground, Image, StatusBar, StyleSheet } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";

// custom imports
import { Images, Colors } from "../../utils";
import { updateSplash } from "./action";

export interface AppProps {
  navigation?: any;
}
export default function App(props: AppProps) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      dispatch(updateSplash());
      props.navigation.navigate("AuthNavigator");
    }, 2000);
  });
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <StatusBar hidden={true} />
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
