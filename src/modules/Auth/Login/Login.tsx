import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  BackHandler,
} from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
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
  CommonFunctions
} from "../../../utils";
import {
  CustomButton,
  Customcartoon,
  CustomInputText,
  CustomMenuList,
  CustomLoader,
} from "../../../Components";
import { fetchSchoolList } from "./action";

const SELECT_SCHOOL = "Select School";
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const input1: any = React.createRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [center, setCenter] = useState(-1);
  const [checkCenter, setCheckCenter] = useState(true);
  const [school, setSchool] = useState(SELECT_SCHOOL);

  const resetAll = () => {
    setCheckEmail(true);
    setEmail("");
    setList([]);
    setSchool(SELECT_SCHOOL);
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
            name: name,
          }))
        : setCheckCenter(false)
      : setCheckEmail(false);
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  }, [BackHandler]);

  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <CustomLoader loading={isLoading} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.backBtn}
        onPress={() => props.navigation.pop()}
      >
        <Image source={Images.back_icon} />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        contentContainerStyle={Styles.mainView}
      >
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
                incorrectText={
                  email.length === 0 ? Strings.Email_empty : Strings.Email_error
                }
                onBlur={() => {
                  Keyboard.dismiss();
                  email.length !== 0
                    ? validate(ConstantName.EMAIL, email)
                      ? (setIsLoading(true),
                        dispatch(
                          fetchSchoolList(
                            email,
                            (data: any) => {
                              let temp = data;
                              temp = temp.map((item: any) => {
                                return {
                                  id: item.id,
                                  value: item.name,
                                  parent: item.Parent,
                                };
                              });
                              setList(temp);
                              setSchool(temp[0].value);
                              setName(temp[0].parent.first_name);
                              setCenter(temp[0].id);
                              setIsLoading(false);
                              temp.length === 0 ? setCheckEmail(false) : null;
                            },
                            () => setIsLoading(false)
                          )
                        ))
                      : setCheckEmail(false)
                    : setCheckEmail(false);
                }}
              />
              {/* School center list ------------- */}
              <CustomMenuList
                titleText={Strings.School_Name}
                data={list}
                onChangeText={(text: string, i: number, data: Array<any>) => {
                  setCheckCenter(true),
                    setName(data[i].parent.first_name),
                    setCenter(data[i].id),
                    setSchool(text);
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
    top: CommonFunctions.iPhoneX ? vh(30) : vh(20),
    alignSelf: "flex-start",
    position: "absolute",
    height: vh(50),
    width: vh(50),
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
