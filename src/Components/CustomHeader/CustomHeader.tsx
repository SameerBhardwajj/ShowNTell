import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Colors, vh, Images, vw, ScreenName, Strings, CommonFunctions } from "../../utils";

export interface AppProps {
  title: string;
  navigation?: any;
  onPressBack: Function;
  notify?: boolean;
  notifyNumber?: number;
  textStyle?: Object;
  hideBackButton?: boolean;
  child?: boolean;
  clear?: boolean;
  onPressClear?: Function;
}

export default function App(props: AppProps) {
  const { currentChild, loginData } = useSelector(
    (state: { Home: any; Login: any }) => ({
      currentChild: state.Home.currentChild,
      loginData: state.Login.loginData,
    })
  );
  return (
    <View style={Styles.mainOuterView}>
      <View style={Styles.extraHeader} />
      <View style={Styles.mainView}>
        <Text numberOfLines={1} style={[Styles.text, props.textStyle]}>
          {props.title}
        </Text>
        {/* child dropdown ------------------------ */}
        {props.child ? (
          <TouchableOpacity
            activeOpacity={loginData.Children.length > 1 ? 0.8 : 1}
            style={Styles.childHeader}
            onPress={() =>
              loginData.Children.length > 1
                ? props.navigation.navigate(ScreenName.CHILD_MODAL, {
                  child: loginData.Children,
                })
                : null
            }
          >
            <Text style={Styles.childHeaderText} numberOfLines={1}>
              {currentChild.name}
            </Text>
            {loginData.Children.length > 1 ? (
              <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
            ) : null}
          </TouchableOpacity>
        ) : null}
        {/* clear button ------------------------ */}
        {props.clear ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.onPressClear === undefined ? null : props.onPressClear()
            }
            style={Styles.clearView}
          >
            <Text style={Styles.clearText}>{Strings.Clear}</Text>
          </TouchableOpacity>
        ) : null}
        {/* back button ------------------------ */}
        {props.hideBackButton ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.btnView}
            onPress={() => props.onPressBack()}
          >
            <Image source={Images.back_icon} style={Styles.btn} />
          </TouchableOpacity>
        )}
        {/* notify ------------------------ */}
        {props.notify ? (
          <View style={Styles.notifyView}>
            <Text style={Styles.notifyText}>{props.notifyNumber}/3</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainOuterView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    backgroundColor: Colors.violet,
    alignItems: "center",
    justifyContent: "center",
    height: vh(70),
    width: "100%",
    paddingTop: vh(20),
  },
  extraHeader: {
    backgroundColor: Colors.violet,
    width: "100%",
    height: CommonFunctions.iPhoneX ? vh(10) : 0,
  },
  text: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: "white",
  },
  btnView: {
    position: "absolute",
    padding: vh(16),
    alignSelf: "flex-start",
  },
  btn: {
    marginTop: vh(18),
  },
  newView: {
    position: "absolute",
    padding: vh(16),
    alignSelf: "flex-start",
  },
  notifyView: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "white",
    height: vh(31),
    width: vw(60),
    top: vh(30),
    right: vh(16),
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  notifyText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    color: Colors.pink,
  },
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    maxWidth: vw(120),
    right: vw(16),
    top: vh(33),
    paddingVertical: vw(3),
    paddingHorizontal: vw(15),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
  },
  dropdown: {
    height: vh(6),
    width: vh(11),
    marginLeft: vw(5),
    marginTop: vh(2),
    tintColor: Colors.violet,
  },
  topModalView: {
    width: "100%",
    backgroundColor: Colors.modalBg2,
  },
  clearView: {
    position: "absolute",
    right: vw(16),
    top: vh(33),
  },
  clearText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: "white",
  },
});
