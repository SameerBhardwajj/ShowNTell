import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// custom imports
import { Images, vh, vw, Colors, Strings, validate } from "../../../utils";
import {
  CustomButton,
  CustomToast,
  Customcartoon,
  CustomInputText,
} from "../../../Components";

export interface AppProps {
  navigation?: any;
}
const iPhoneX = Dimensions.get("window").height >= 812;

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [secureEntry, setsecureEntry] = useState(true);

  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.backBtn}
          onPress={() => props.navigation.pop()}
        >
          <Image source={Images.back_icon} />
        </TouchableOpacity>
        <Customcartoon navigation={props.navigation} small={true} />
        <View style={Styles.loginView}>
          <View style={Styles.loginMainView}>
            <Text style={Styles.loginText}>{Strings.login}</Text>
            <Text style={Styles.loginFooter}>
              {Strings.please_enter_email_and_password}
            </Text>
            <View style={Styles.inputView}>
              {/* Email ------------------ */}
              <CustomInputText
                check={checkEmail}
                ref={input1}
                titleText={Strings.Parent_email}
                keyboardType={"email-address"}
                value={email}
                onChangeText={(text: string) => {
                  checkEmail ? null : setCheckEmail(true), setEmail(text);
                }}
                onSubmitEditing={() => {
                  validate("email", email)
                    ? input2.current.focus()
                    : setCheckEmail(false);
                }}
                incorrectText={Strings.Email}
              />
              {/* Password ------------------ */}
              <CustomInputText
                check={checkPassword}
                ref={input2}
                titleText={Strings.password}
                keyboardType={"default"}
                typePassword={true}
                value={password}
                secureTextEntry={secureEntry}
                onPressEye={() => setsecureEntry(!secureEntry)}
                onChangeText={(text: string) => {
                  checkPassword ? null : setCheckPassword(true),
                    setPassword(text);
                }}
                onSubmitEditing={() => {
                  validate("password", password)
                    ? validate("email", email)
                      ? props.navigation.navigate("TabNavigator")
                      : setCheckEmail(false)
                    : (setPassword(""), setCheckPassword(false));
                }}
                incorrectText={Strings.password}
                returnKeyType="done"
              />
            </View>
            {/* Forgot password --------------- */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.forgotView}
              onPress={() => props.navigation.navigate("ResetPasswordEmail")}
            >
              <Text style={Styles.forgotTxt}>{Strings.forgot_password}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", width: "100%" }}>
            {/* Login ------------------ */}
            <CustomButton
              Text={Strings.proceed}
              ButtonStyle={[Styles.btn, { marginTop: vh(15) }]}
              onPress={() => {
                validate("password", password)
                  ? validate("email", email)
                    ? props.navigation.navigate("TabNavigator")
                    : setCheckEmail(false)
                  : (setPassword(""), setCheckPassword(false));
              }}
            />
            {/* Register -------------------- */}
            <CustomButton
              Text={Strings.register}
              ButtonStyle={Styles.btn}
              onPress={() => props.navigation.navigate("Register")}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.navigation.navigate("NeedHelp", { path: "Login" })
            }
          >
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
    padding: vh(16),
    top: iPhoneX ? vh(30) : vh(20),
    alignSelf: "flex-start",
    position: "absolute",
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
    justifyContent: "center",
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
