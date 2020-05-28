import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// custom imports
import { updateTab } from "../Home/action";
import { useDispatch } from "react-redux";
import { CustomHeader } from "../../Components";
import { Strings, vw, vh, Colors, ScreenName, Images } from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(updateTab(true, () => {}));
  }, []);
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
        contentContainerStyle={{ width: "100%", height: "100%" }}
      >
        <View style={Styles.scrollStyle}>
          {DATA.map((item, index) => (
            <View style={Styles.innerView}>
              {item.date.length !== 0 ? (
                <Text style={Styles.heading}>{item.date}</Text>
              ) : null}
              <View
                style={[
                  Styles.contentView,
                  {
                    backgroundColor:
                      index % 3 === 0
                        ? Colors.lightWaterBlue
                        : index % 2 === 0
                        ? Colors.lightPink
                        : Colors.lightGreen,
                  },
                ]}
              >
                <Text style={Styles.content}>{item.content}</Text>
                <Text style={Styles.time}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={Styles.bottomView}>
          <View style={Styles.warningView}>
            <Text style={Styles.warningText}>{Strings.Chat_warning}</Text>
          </View>
          <View style={{ width: "100%" }}>
            <TextInput
              value={msg}
              placeholder={Strings.Write_here}
              onChangeText={(text) => setMsg(text)}
              style={Styles.inputTxt}
              // multiline
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
    backgroundColor: "white",
  },
  scrollStyle: {
    flex: 0.7,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  innerView: {
    padding: vh(16),
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  contentView: {
    padding: vw(20),
    borderRadius: vh(10),
    marginTop: vh(15),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  content: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  time: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingTop: vh(10),
    color: Colors.lightBlack,
  },
  bottomView: {
    flex: 0.3,
    width: "100%",
    alignItems: "center",
    padding: vh(16),
    backgroundColor: "white",
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
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
  sendBtnView: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingHorizontal: vw(16),
    paddingVertical: vh(15)
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
