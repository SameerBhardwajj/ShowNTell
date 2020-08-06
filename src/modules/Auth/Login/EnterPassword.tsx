import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueId, getBrand } from "react-native-device-info";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomInputText,
  CustomLoader,
  CustomToast,
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
import { loginAPI } from "./action";

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
  const { params } = props.route;

  const { deviceToken } = useSelector((state: { Login: any }) => ({
    deviceToken: state.Login.deviceToken,
  }));

  const check = () => {
    Keyboard.dismiss();
    password.length >= 8
      ? validate(ConstantName.PASSWORD, password)
        ? (setIsLoading(true), HitLogin(getUniqueId(), deviceToken, getBrand()))
        : (CustomToast(Strings.Password_Error), setCheckPassword(false))
      : setCheckPassword(false);
  };

  const HitLogin = (deviceID: string, token: string, deviceName: string) => {
    console.warn("token ", deviceToken);

    dispatch(
      loginAPI(
        params.email,
        password,
        params.center.toString(),
        deviceID,
        token,
        deviceName,
        () => {
          Keyboard.dismiss();
          setIsLoading(false);
        }
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Enter_password}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.welcome}>{Strings.Welcome}</Text>
        {params.name === "" ? null : (
          <Text style={Styles.name}>{params.name}</Text>
        )}
        <Text style={Styles.please}>{Strings.Please_enter_password}</Text>
        <CustomLoader loading={isLoading} />
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
          incorrectText={password.length < 8 ? Strings.Password_length : ""}
          returnKeyType="done"
          mainViewStyle={{ marginTop: vh(16) }}
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
