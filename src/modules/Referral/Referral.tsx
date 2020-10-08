import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

// Custom Imports
import {
  CustomHeader,
  CustomLoader,
  CustomPhoneField,
  CustomInputText,
  CustomButton,
} from "../../Components";
import {
  Strings,
  vh,
  validate,
  ConstantName,
  Colors,
  vw,
  ScreenName,
} from "../../utils";
import { hitReferralAPI } from "./action";
import { useDispatch, useSelector } from "react-redux";

export interface AppProps {
  navigation: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state: { Login: any }) => ({
    loginData: state.Login.loginData,
  }));
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const input4: any = React.createRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pname, setPname] = useState("");
  const [pLname, setPLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [checkpname, setCheckPname] = useState(true);
  const [checkpLname, setCheckPLname] = useState(true);
  const [checkphone, setCheckphone] = useState(true);
  const [checkemail, setCheckemail] = useState(true);

  const formatPhone = (f: string) => {
    let f_val = f.replace(/\D+/g, "");
    f =
      "(" + f_val.slice(0, 3) + ") " + f_val.slice(3, 6) + "-" + f_val.slice(6);
    return f;
  };

  const check = () => {
    Keyboard.dismiss();
    validate(ConstantName.NAME, pname)
      ? validate(ConstantName.NAME, pLname)
        ? validate(ConstantName.PHONE, phone)
          ? validate(ConstantName.EMAIL, email)
            ? ReferralAPI()
            : setCheckemail(false)
          : setCheckphone(false)
        : setCheckPLname(false)
      : setCheckPname(false);
  };

  const ReferralAPI = () => {
    setIsLoading(true);
    dispatch(
      hitReferralAPI(
        {
          Lead: {
            location_id: loginData.location_id,
            first_name: pname,
            last_name: pLname,
            mobile_phone: formatPhone(phone),
            email: email,
          },
        },
        () => {
          setIsLoading(false);
          props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
            heading: Strings.Thank_You,
            msg: Strings.Referral_Success,
          });
        },
        () => {
          setIsLoading(false);
        }
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Referrals}
        onPressBack={() => props.navigation.pop()}
      />
      <CustomLoader loading={isLoading} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styles.innerView}
      >
        <View style={{ width: "100%" }}>
          {/* Parent's first name ---------- */}
          <CustomInputText
            ref={input1}
            titleText={Strings.Parent_First_Name}
            value={pname}
            onChangeText={(text: string) => {
              checkpname ? null : setCheckPname(true), setPname(text);
            }}
            onSubmitEditing={() => {
              validate(ConstantName.NAME, pname)
                ? input2.current.focus()
                : setCheckPname(false);
            }}
            check={checkpname}
            mainViewStyle={Styles.textInput}
            incorrectText={
              pname.length === 0 ? Strings.Name_empty : Strings.Name_error
            }
          />

          {/* Parent's last name ---------- */}
          <CustomInputText
            ref={input2}
            titleText={Strings.Parent_Last_Name}
            value={pLname}
            onChangeText={(text: string) => {
              checkpLname ? null : setCheckPLname(true), setPLname(text);
            }}
            onSubmitEditing={() => {
              validate(ConstantName.NAME, pLname)
                ? input3.current.focus()
                : setCheckPLname(false);
            }}
            check={checkpLname}
            mainViewStyle={Styles.textInput}
            incorrectText={
              pLname.length === 0 ? Strings.Name_empty : Strings.Name_error
            }
          />

          {/* Parent's phone no.----------- */}
          <CustomPhoneField
            value={phone}
            ref={input3}
            onChangeText={(text: string) => {
              checkphone ? null : setCheckphone(true), setPhone(text);
            }}
            check={checkphone}
            onSubmitEditing={() => {
              validate(ConstantName.PHONE, phone)
                ? input4.current.focus()
                : setCheckphone(false);
            }}
            mainViewStyle={{ width: "100%", marginTop: vh(10) }}
          />

          {/* Parent's email --------------- */}
          <CustomInputText
            ref={input4}
            titleText={Strings.Parent_email}
            value={email}
            onChangeText={(text: string) => {
              checkemail ? null : setCheckemail(true), setEmail(text);
            }}
            onSubmitEditing={() => {
              validate(ConstantName.EMAIL, email)
                ? check()
                : setCheckemail(false);
            }}
            check={checkemail}
            incorrectText={
              email.length === 0 ? Strings.Email_empty : Strings.Email_error
            }
            mainViewStyle={Styles.textInput}
            keyboardType={"email-address"}
          />

          <CustomButton
            Text={Strings.Submit}
            activeOpacity={0.8}
            onPress={() => check()}
            ButtonStyle={{
              width: "100%",
              alignSelf: "center",
              marginTop: vh(48),
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  txt: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    letterSpacing: -0.32,
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    width: "100%",
  },
  textInput: {
    marginTop: vh(10),
  },
  btn: {
    width: "100%",
    marginTop: vh(20),
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
  },
  inputTxt: {
    height: vh(48),
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
    width: "100%",
    marginTop: vh(10),
    marginBottom: vh(15),
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.veryLightGrey,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
