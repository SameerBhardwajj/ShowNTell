import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// custom imports
import { Images, vh, vw, Colors, Strings, validateEmail } from "../../../utils";
import {
  CustomButton,
  CustomToast,
  Customcartoon,
  CustomInputText,
  CustomMenuList,
} from "../../../Components";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckcheckEmail] = useState(true);
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.backBtn}
          onPress={() => props.navigation.pop()}
        >
          <Image source={Images.back_icon} />
        </TouchableOpacity>
        <Customcartoon
          navigation={props.navigation}
          viewStyle={{ width: vw(300), marginTop: vh(115) }}
        />
        <View style={Styles.loginView}>
          <View style={Styles.loginMainView}>
            <Text style={Styles.loginText}>{Strings.register}</Text>
            <Text style={Styles.loginFooter}>
              {Strings.please_enter_email_and_centre}
            </Text>
            <View style={Styles.inputView}>
              {/* Email ---------------- */}
              <CustomInputText
                check={checkEmail}
                titleText={Strings.Parent_email}
                keyboardType={"email-address"}
                value={email}
                onChangeText={(text: string) => {
                  checkEmail ? null : setCheckcheckEmail(true), setEmail(text);
                }}
                onSubmitEditing={() => {
                  validateEmail(email)
                    ? Keyboard.dismiss()
                    : setCheckcheckEmail(false);
                }}
                incorrectText={Strings.Email}
              />
              {/* School center list ------------- */}
              <CustomMenuList
                titleText={Strings.choose_centre}
                onPress={() => CustomToast()}
              />
            </View>
          </View>
          <CustomButton
            Text={Strings.proceed}
            ButtonStyle={[Styles.btn, { marginTop: vh(15) }]}
            onPress={() => {
              validateEmail(email)
                ? props.navigation.navigate("AccessCodeVerification", {
                    email: email,
                  })
                : setCheckcheckEmail(false);
            }}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
            <Text style={Styles.btnText}>{Strings.need_help}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
const Styles = StyleSheet.create({
  mainImg: {
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    padding: vh(16),
    paddingRight: vw(40),
    alignSelf: "flex-start",
    top: vh(25),
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
    marginTop: vh(30),
    marginBottom: vh(30),
  },
  loginMainView: {
    width: "100%",
    padding: vw(15),
  },
  loginText: {
    fontSize: vh(32),
    fontFamily: "Nunito-Bold",
  },
  loginFooter: {
    fontSize: vh(14),
    fontFamily: "Nunito-Regular",
    color: Colors.lightGrey,
  },
  inputView: {
    marginTop: vh(15),
  },
  forgotView: {
    paddingHorizontal: vw(15),
    alignSelf: "flex-end",
  },
  forgotTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(12),
    color: Colors.violet,
  },
  btn: {
    width: "90%",
    margin: vh(8),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    padding: vw(18),
    paddingTop: vh(10),
  },
});
