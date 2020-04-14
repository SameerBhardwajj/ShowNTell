import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// custom imports
import { Images, vh, vw, Colors, Strings } from "../../../utils";
import { CustomButton, CustomToast, Customcartoon } from "../../../Components";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <View style={Styles.cartoonMainView}>
        <Customcartoon />
      </View>
      <View style={Styles.loginView}>
        <View style={Styles.testimonialView}>
          <View style={Styles.testimonialImg}>
            <Image source={Images.Testimonial_Base} resizeMode="cover" />
          </View>
          <Image source={Images.Colen_Bubble} style={Styles.testimonialColen} />
          <View style={Styles.testimonialTxtView}>
            <Text numberOfLines={4} style={Styles.testimonialtext}>
              {Strings.testimonialtext}
            </Text>
            <Text style={Styles.testimonialAuthor}>
              {Strings.testimonialAuthor}
            </Text>
            <Text style={Styles.testimonialCentre}>
              {Strings.testimonialCentre}
            </Text>
          </View>
        </View>
        <CustomButton
          Text={Strings.login}
          onPress={() => props.navigation.navigate("Login")}
        />
        <CustomButton
          Text={Strings.find_school}
          onPress={() => CustomToast()}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
          <Text style={Styles.btnText}>{Strings.need_help}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const Styles = StyleSheet.create({
  mainImg: {
    flex: 1,
    alignItems: "center",
  },
  cartoonMainView: {
    position: "absolute",
    top: vh(118),
  },
  testimonialView: {
    width: "100%",
    height: vh(220),
    alignItems: "center",
  },
  testimonialImg: {
    marginTop: vh(50),
  },
  testimonialColen: {
    position: "absolute",
    alignSelf: "center",
    marginTop: vh(30),
  },
  testimonialTxtView: {
    position: "absolute",
    width: "70%",
    height: vh(100),
    marginTop: vh(75),
  },
  testimonialtext: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vw(16),
    textAlign: "center",
  },
  testimonialAuthor: {
    fontFamily: "Nunito-Bold",
    fontSize: vw(16),
    textAlign: "center",
    color: Colors.pink,
    paddingTop: vh(2),
  },
  testimonialCentre: {
    fontFamily: "Nunito-Medium",
    fontSize: vw(14),
    textAlign: "center",
    paddingTop: vh(2),
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
    top: vh(253),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    padding: vw(28),
    paddingTop: vh(10),
  },
});
