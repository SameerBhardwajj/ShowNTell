import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Platform,
  Clipboard,
  // TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceId, getBrand } from "react-native-device-info";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

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
import { updateLogin, loginAPI } from "./action";
import FirebaseServices from "../../../utils/FirebaseServices";

const myToken =
  "02fa3877720c0d02c84d51fa7718d9274c4e4cab10051ba93ca1e56238d905cd";

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

  const { loginToken, loginData } = useSelector(
    (state: { Home: any; Login: any; ClassroomSchedule: any }) => ({
      loginToken: state.Login.loginToken,
      loginData: state.Login.loginData,
    })
  );

  React.useEffect(() => {
    console.warn(loginToken);
    console.warn(loginData);
  }, []);

  const check = () => {
    Keyboard.dismiss();
    password.length >= 8
      ? validate(ConstantName.PASSWORD, password)
        ? (setIsLoading(true), getTokens())
        : (CustomToast(Strings.Password_Error), setCheckPassword(false))
      : setCheckPassword(false);
  };

  // const getTokens = () => {
  //   Platform.OS === "ios"
  //     ? HitLogin(getDeviceId(), myToken, getBrand())
  //     : FirebaseServices.getToken((myToken: string) => {
  //         HitLogin(getDeviceId(), myToken, getBrand());
  //         console.warn(getDeviceId(), myToken, getBrand());
  //         Clipboard.setString(myToken);
  //       });
  // };

  const getTokens = () => {
    Platform.OS === "ios"
      ? PushNotificationIOS.requestPermissions()
          .then(() => {
            PushNotificationIOS.addEventListener("register", (token) => {
              HitLogin(getDeviceId(), token, getBrand());
            });
          })
          .catch((error) => {
            CustomToast(error);
          })
      : FirebaseServices.getToken((myToken: string) => {
          HitLogin(getDeviceId(), myToken, getBrand());
        });
  };

  const HitLogin = (deviceID: string, token: string, deviceName: string) => {
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
