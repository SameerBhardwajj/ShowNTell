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
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

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
import { register } from "./action";

const iPhoneX = Dimensions.get("window").height >= 812;
const SELECT_SCHOOL = "Select School";
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [center, setCenter] = useState(0);
  const [checkEmail, setCheckcheckEmail] = useState(true);
  const [checkCenter, setCheckCenter] = useState(true);
  const [school, setSchool] = useState(SELECT_SCHOOL);
  const [isLoading, setIsLoading] = useState(false);
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
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
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
                onChangeText={(text: string, i: number, data: Array<any>) => {
                  setCenter(data[i].id), setSchool(text), setCheckCenter(true);
                }}
                currentText={school}
                dropDownView={{ width: "80%" }}
                check={checkCenter}
              />
            </View>
          </View>
          <CustomButton
            Text={Strings.proceed}
            ButtonStyle={[Styles.btn, { marginTop: vh(15) }]}
            onPress={() => {
              validate(ConstantName.EMAIL, email)
                ? school === SELECT_SCHOOL
                  ? setCheckCenter(false)
                  : (setIsLoading(true),
                    dispatch(
                      register(
                        email,
                        center,
                        () => {
                          setIsLoading(false);
                          props.navigation.navigate(
                            ScreenName.ACCESS_CODE_VERIFICATION
                          );
                        },
                        () => setIsLoading(false)
                      )
                    ))
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
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
});
