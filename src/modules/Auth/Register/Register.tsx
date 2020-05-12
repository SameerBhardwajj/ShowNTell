import React, { useState } from "react";
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
import {
  Images,
  vh,
  vw,
  Colors,
  Strings,
  validate,
  ConstantName,
  ScreenName,
} from "../../../utils";
import {
  CustomButton,
  Customcartoon,
  CustomInputText,
  CustomMenuList,
} from "../../../Components";
const iPhoneX = Dimensions.get("window").height >= 812;
const SELECT_SCHOOL = "Select School";
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckcheckEmail] = useState(true);
  const [school, setSchool] = useState(SELECT_SCHOOL);
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.mainView}
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
                  validate(ConstantName.EMAIL, email)
                    ? Keyboard.dismiss()
                    : setCheckcheckEmail(false);
                }}
                incorrectText={Strings.Email_error}
              />
              {/* School center list ------------- */}
              <CustomMenuList
                titleText={Strings.School_Name}
                onChangeText={(text: string) => setSchool(text)}
                currentText={school}
                data={DATA}
                dropDownView={{width: '80%'}}
              />
            </View>
          </View>
          <CustomButton
            Text={Strings.proceed}
            ButtonStyle={[Styles.btn, { marginTop: vh(15) }]}
            onPress={() => {
              validate(ConstantName.EMAIL, email)
                ? props.navigation.navigate(
                    ScreenName.ACCESS_CODE_VERIFICATION,
                    {
                      email: email,
                    }
                  )
                : setCheckcheckEmail(false);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.navigation.navigate(ScreenName.NEED_HELP, {
                path: ScreenName.REGISTER,
              })
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
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mainImg: {
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    padding: vh(16),
    paddingRight: vw(40),
    alignSelf: "flex-start",
    top: iPhoneX ? vh(30) : vh(20),
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
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
    padding: vw(15),
    paddingTop: vh(10),
  },
});

// Dummy data for School listy API
const DATA = [
  { value: "School 1" },
  { value: "School 2" },
  { value: "School 3" },
  { value: "School 1" },
  { value: "School 2" },
  { value: "School 3" },
  { value: "School 1" },
  { value: "School 2" },
  { value: "School 3" },
];
