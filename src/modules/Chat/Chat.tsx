import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "../Home/action";
import { CustomHeader, CustomSeparator } from "../../Components";
import { Strings, vw, vh, Colors, ScreenName, Images } from "../../utils";
import { getCannedMsgs } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { cannedMsg } = useSelector((state: { Chat: any }) => ({
    cannedMsg: state.Chat.cannedMsg,
  }));
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // dispatch(updateTab(true, () => {}));
    dispatch(
      getCannedMsgs(
        () => {},
        () => {}
      )
    );
  }, []);

  const renderCannedMgs = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={[Styles.mainImageView]}
      >
        <Text style={Styles.cannedText}>{item.message}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Chat_Room}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={Styles.scrollStyle}></View>
        <View style={Styles.bottomView}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              bounces={false}
              data={cannedMsg}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCannedMgs}
            />
          </View>
          <CustomSeparator />
          <View style={Styles.warningView}>
            <Text style={Styles.warningText}>{Strings.Chat_warning}</Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              value={msg}
              placeholder={Strings.Write_here}
              onChangeText={(text) => setMsg(text)}
              style={Styles.inputTxt}
              multiline
            />
            <TouchableOpacity style={Styles.sendBtnView}>
              <Image source={Images.Send_Icon} style={Styles.sendBtn} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  scrollStyle: {
    height: "60%",
    width: "100%",
    backgroundColor: "transparent",
  },
  bottomView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: vh(16),
    backgroundColor: "white",
  },
  mainImageView: {
    borderRadius: vh(50),
    borderColor: Colors.violet,
    marginHorizontal: vw(4),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.fadedPink,
    padding: vh(13),
    marginBottom: vh(10),
  },
  cannedText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.violet,
  },
  warningView: {
    padding: vh(12),
    borderRadius: vh(10),
    borderWidth: vw(1),
    borderColor: Colors.chatBorderGrey,
  },
  warningText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.lightGrey,
    lineHeight: vh(20),
  },
  inputTxt: {
    height: vh(48),
    borderRadius: vh(50),
    paddingLeft: vw(25),
    paddingRight: vw(50),
    width: "100%",
    marginTop: vh(10),
    marginBottom: vh(15),
    backgroundColor: Colors.veryLightGrey,
    // alignItems: "center",
    // justifyContent: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingTop: vh(10),
  },
  sendBtnView: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingHorizontal: vw(16),
    paddingVertical: vh(16),
  },
  sendBtn: {
    height: vh(32),
    width: vh(32),
  },
});

const DATA = [
  {
    date: "Today",
    content:
      "Parent workshop has been conducted in the school premisis on 07th February. Make sure all of you attent the workshop from 10AM onwards.",
    time: "10:00 AM",
  },
  {
    date: "Yesterday",
    content:
      "We will be celebrating X-Mas tomorrow. Please bring some candles and be dressed up. Let’s Celebrate the festival together.",
    time: "10:00 AM",
  },
  {
    date: "Jan 20, 2020",
    content:
      "Parent workshop has been conducted in the school premisis on 27th january. Make sure all of you attent the workshop from 10AM onwards.",
    time: "10:00 AM",
  },
  {
    date: "",
    content:
      "Parent workshop has been conducted in the school premisis on 27th january. Make sure all of you attent the workshop from 10AM onwards.",
    time: "10:00 AM",
  },
];
