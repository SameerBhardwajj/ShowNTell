import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
  CustomPhoneField,
} from "../../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  validate,
  ScreenName,
  ConstantName,
} from "../../../utils";
import { resendCode } from "./action";
import { fpresendCode } from "../ForgotPassword/action";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const [phone, setPhone] = useState("");
  const [checkphone, setCheckPhone] = useState(true);
  const [countryCode, setCountryCode] = useState("US");
  const [isLoading, setIsLoading] = useState(false);

  const { type } = props.route.params;

  const { email, name } = useSelector(
    (state: { Register: any; ForgotPassword: any }) => ({
      email: type === 0 ? state.Register.email : state.ForgotPassword.email,
      name: type === 0 ? state.Register.name : state.ForgotPassword.name,
    })
  );

  const formatPhone = (f: string) => {
    let f_val = f.replace(/\D[^\.]/g, "");
    f = f_val.slice(0, 3) + "-" + f_val.slice(3, 6) + "-" + f_val.slice(6);
    return f;
  };

  const check = () => {
    validate(ConstantName.PHONE, phone)
      ? (Keyboard.dismiss(),
        setIsLoading(true),
        type === 0
          ? dispatch(
              resendCode(
                email,
                formatPhone(phone),
                () => {
                  setIsLoading(false);
                  props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                    path: props.route.params.path,
                  });
                },
                () => setIsLoading(false)
              )
            )
          : dispatch(
              fpresendCode(
                email,
                formatPhone(phone),
                () => {
                  setIsLoading(false);
                  props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                    path: props.route.params.path,
                  });
                },
                () => setIsLoading(false)
              )
            ))
      : setCheckPhone(false);
  };

  return (
    <View style={Styles.mainView}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CustomHeader
          title={Strings.Request_New_Access_Code}
          onPressBack={() => props.navigation.pop()}
        />
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
        <View style={Styles.innerView}>
          <Text style={Styles.welcome}>{Strings.hello}</Text>
          <Text style={Styles.name}>{name}</Text>
          <Text style={Styles.please}>{Strings.enter_phone_and_email}</Text>
          <View style={Styles.codeView}>
            {/* email -------------- */}
            <CustomInputText
              ref={inputRef1}
              editable={false}
              titleText={Strings.Parent_email}
              value={email}
              onChangeText={(text: string) => {}}
              check={true}
              incorrectText={Strings.Email}
              onSubmitEditing={() => {}}
            />
            {/* phone number ---------------- */}
            <CustomPhoneField
              onSelect={(code: any) => setCountryCode(code)}
              value={phone}
              ref={inputRef2}
              onChangeText={(text: string) => {
                checkphone ? null : setCheckPhone(true), setPhone(text);
              }}
              check={checkphone}
              onSubmitEditing={() => check()}
              mainViewStyle={{ width: "100%" }}
            />
            <View style={{ alignItems: "center", width: "100%" }}>
              <CustomButton
                Text={Strings.Resent_Access_Code}
                onPress={() => check()}
                ButtonStyle={{
                  width: "100%",
                }}
              />
              <CustomButton
                Text={Strings.I_have_Access_Code}
                onPress={() => props.navigation.pop()}
                ButtonStyle={{ width: "100%" }}
              />
            </View>
          </View>
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
  innerView: {
    marginHorizontal: vw(16),
    marginVertical: vh(20),
  },
  welcome: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
  },
  name: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(20),
    marginVertical: vh(8),
  },
  please: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    color: Colors.lightGrey,
    marginVertical: vh(8),
  },
  codeView: {
    alignItems: "center",
    marginVertical: vh(32),
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
