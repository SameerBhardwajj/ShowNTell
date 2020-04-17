import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
  CustomToast,
} from "../../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  validateEmail,
  validatePhone,
} from "../../../utils";
import { updateAccess, delayAccess } from "./actions";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { access } = useSelector((state: { Register: any }) => ({
    access: state.Register.access,
  }));
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const [email, setEmail] = useState(props.route.params.email);
  const [phone, setPhone] = useState("+");
  const [checkphone, setCheckPhone] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);

  return (
    <View style={Styles.mainView}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomHeader
          title={Strings.Request_New_Access_Code}
          onPressBack={() => props.navigation.pop()}
        />
        <View style={Styles.innerView}>
          <Text style={Styles.welcome}>{Strings.hello}</Text>
          <Text style={Styles.name}>Mr. Bob Parish</Text>
          <Text style={Styles.please}>{Strings.enter_phone_and_email}</Text>
          <View style={Styles.codeView}>
            {/* email -------------- */}
            <CustomInputText
              ref={inputRef1}
              editable={false}
              titleText={Strings.Parent_email}
              value={email}
              onChangeText={(text: string) => {}}
              check={checkEmail}
              incorrectText={Strings.Email}
              onSubmitEditing={() => {}}
            />
            {/* phone number ---------------- */}
            <CustomInputText
              ref={inputRef2}
              editable={true}
              titleText={Strings.parentPhone}
              keyboardType={"phone-pad"}
              mainViewStyle={{ marginVertical: vh(24) }}
              value={phone}
              onChangeText={(text: string) => {
                checkphone ? null : setCheckPhone(true), setPhone(text);
              }}
              check={checkphone}
              incorrectText={Strings.phone_number}
              returnKeyType={"done"}
              onSubmitEditing={() => {
                validatePhone(phone)
                  ? // access === true
                    //   ?
                    (Keyboard.dismiss(),
                    dispatch(updateAccess()),
                    dispatch(delayAccess()),
                    props.navigation.navigate("ResendCodeModal"))
                  : // : null
                    setCheckPhone(false);
              }}
            />
            <View style={{ alignItems: "center", width: "100%" }}>
              <CustomButton
                Text={Strings.Resent_Access_Code}
                // activeOpacity={access ? 0.8 : 1}
                onPress={() => {
                  // access
                  //   ?
                  validatePhone(phone)
                    ? // ? access === true
                      (Keyboard.dismiss(),
                      dispatch(updateAccess()),
                      dispatch(delayAccess()),
                      props.navigation.navigate("ResendCodeModal"))
                    : // : null
                      setCheckPhone(false);
                  // : null;
                }}
                ButtonStyle={{
                  width: "100%",
                  // backgroundColor:
                  //   access === true ? Colors.violet : Colors.disableViolet,
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
});
