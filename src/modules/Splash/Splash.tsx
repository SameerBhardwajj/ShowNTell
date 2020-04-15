import * as React from "react";
import { ImageBackground, Image, StatusBar, StyleSheet } from "react-native";

// custom imports
import { Images, Colors } from "../../utils";

export interface AppProps {
  navigation?: any;
}
export default function App(props: AppProps) {
  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("AuthNavigator");
    }, 2000);
  });
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
