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
          <Image
            source={Images.Testimonial_Base}
            resizeMode="contain"
            resizeMethod="resize"
            style={Styles.testimonialImg}
          />
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
    top: vh(83),
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
    top: vh(110),
  },
  testimonialView: {
    width: vw(330),
    alignItems: "center",
    marginBottom: vh(20),
  },
  testimonialImg: {
    marginTop: vw(40),
    width: vw(350),
    height: vw(180),
  },
  testimonialColen: {
    position: "absolute",
    alignSelf: "center",
    marginTop: vw(15),
  },
  testimonialTxtView: {
    position: "absolute",
    marginHorizontal: vw(30),
    marginTop: vw(65),
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
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    padding: vw(28),
    paddingTop: vh(10),
  },
});
