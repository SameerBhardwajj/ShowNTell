import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomInputText,
} from "../../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  ScreenName,
  validate,
  ConstantName,
} from "../../../utils";
import { updateLogin } from "./action";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const input2: any = React.createRef();
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);
  const [secureEntry, setsecureEntry] = useState(true);

  const { email, name, id } = useSelector(
    (state: { Register: any; Login: any }) => ({
      email: state.Register.email,
      name: state.Register.name,
      id: state.Register.id,
    })
  );
  const check = () => {
    Keyboard.dismiss();
    validate(ConstantName.PASSWORD, password)
      ? // setIsLoading(true),
        // dispatch(
        //   loginAPI(email, password, () => {
        //     console.warn("here");

        //     setIsLoading(false);
        //   })
        // )
        // props.navigation.navigate(ScreenName.TOP_TAB_NAVIGATOR)
        dispatch(updateLogin("any"))
      : setCheckPassword(false);
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Enter_password}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.welcome}>{Strings.Welcome}</Text>
        {/* {name === "" ? null : ( */}
        <Text style={Styles.name}>{"Bob Parish"}</Text>
        {/* )} */}
        <Text style={Styles.please}>
          {Strings.Please_enter_password}
          {email}
        </Text>
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
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
            checkPassword ? null : setCheckPassword(true), setPassword(text);
          }}
          onSubmitEditing={() => check()}
          incorrectText={Strings.Password_length}
          returnKeyType="done"
        />
        <View style={{ alignItems: "center" }}>
          {/* Verify Button ----------------- */}
          <CustomButton
            Text={Strings.login}
            onPress={() => check()}
            ButtonStyle={{
              width: "100%",
            }}
          />
        </View>
        {/* Forgot password --------------- */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.forgotView}
          onPress={() => {
            props.navigation.navigate(ScreenName.RESET_PASSWORD_EMAIL);
          }}
        >
          <Text style={Styles.forgotTxt}>{Strings.forgot_password}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", width: "100%" }}></View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: vh(32),
  },
  footer: {
    flexDirection: "row",
    marginTop: vw(30),
  },
  didntReceive: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
  },
  requestNew: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    color: Colors.violet,
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
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
});
