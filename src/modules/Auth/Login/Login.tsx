import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

// custom imports
import {
  Images,
  vh,
  vw,
  Colors,
  Strings,
  validate,
  ScreenName,
  ConstantName,
} from "../../../utils";
import {
  CustomButton,
  Customcartoon,
  CustomInputText,
  CustomMenuList,
} from "../../../Components";
import { loginAPI, fetchSchoolList } from "./action";

const SELECT_SCHOOL = "Select School";
export interface AppProps {
  navigation?: any;
}
const iPhoneX = Dimensions.get("window").height >= 812;

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const input1: any = React.createRef();
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [center, setCenter] = useState(-1);
  const [checkCenter, setCheckCenter] = useState(true);
  const [school, setSchool] = useState(SELECT_SCHOOL);

  const resetAll = () => {
    setCheckEmail(true);
    Keyboard.dismiss();
  };

  const check = () => {
    validate(ConstantName.EMAIL, email)
      ? center !== -1
        ? (setIsLoading(false),
          resetAll(),
          props.navigation.navigate(ScreenName.ENTER_PASSWORD, {
            email: email,
            center: center,
          }))
        : setCheckCenter(false)
      : setCheckEmail(false);
  };

  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.mainView}
      >
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
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
              {Strings.please_enter_email_and_centre}
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
                  validate(ConstantName.EMAIL, email)
                    ? Keyboard.dismiss()
                    : setCheckEmail(false);
                }}
                incorrectText={Strings.Email_error}
                onBlur={() => {
                  Keyboard.dismiss();
                  dispatch(
                    fetchSchoolList(
                      email,
                      (data: any) => {
                        let temp = data;
                        temp = temp.map((item: any) => {
                          return {
                            id: item.id,
                            value: item.name,
                          };
                        });
                        setList(temp);
                        temp.length === 0 ? setCheckEmail(false) : null;
                      },
                      () => setIsLoading(false)
                    )
                  );
                }}
              />
              {/* School center list ------------- */}
              <CustomMenuList
                titleText={Strings.School_Name}
                data={list}
                onChangeText={(text: string, i: number, data: Array<any>) => {
                  console.warn(data[i].id);

                  setCheckCenter(true), setCenter(data[i].id), setSchool(text);
                }}
                currentText={school}
                dropDownView={{ width: "80%" }}
                check={checkCenter}
              />
            </View>
            {/* Forgot password --------------- */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.forgotView}
              onPress={() => {
                resetAll();
                props.navigation.navigate(ScreenName.RESET_PASSWORD_EMAIL);
              }}
            >
              <Text style={Styles.forgotTxt}>{Strings.forgot_password}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", width: "100%" }}>
            {/* Proceed ------------------ */}
            <CustomButton
              Text={Strings.proceed}
              ButtonStyle={[Styles.btn, { marginTop: vh(15) }]}
              onPress={() => check()}
            />
            {/* Register -------------------- */}
            <CustomButton
              Text={Strings.register}
              ButtonStyle={Styles.btn}
              onPress={() => {
                resetAll(), props.navigation.navigate(ScreenName.REGISTER);
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              resetAll();
              props.navigation.navigate(ScreenName.NEED_HELP, {
                path: ScreenName.LOGIN,
              });
            }}
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
    padding: vh(16),
    top: iPhoneX ? vh(30) : vh(20),
    alignSelf: "flex-start",
    position: "absolute",
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
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
