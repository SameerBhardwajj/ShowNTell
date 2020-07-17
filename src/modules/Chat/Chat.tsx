import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// custom imports
import { updateTab } from "../Home/action";
import { CustomHeader, CustomSeparator } from "../../Components";
import { Strings, vw, vh, Colors, ScreenName, Images } from "../../utils";
import { getCannedMsgs, sendMsg, getMsgs } from "./action";
import MsgFlatlist from "./MsgFlatlist";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { cannedMsg, chatData } = useSelector((state: { Chat: any }) => ({
    cannedMsg: state.Chat.cannedMsg,
    chatData: state.Chat.chatData,
  }));
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const [msgID, setMsgID] = useState("");
  // const [page, setPage] = useState(0);
  const [time, settime] = useState(0);

  useEffect(() => {
    // Hit API after 3 sec
    // time >= 0
    //   ? setTimeout(() => {
    //       console.warn(time);
    //       settime(time + 1);
    //     }, 3000)
    //   : null;

    dispatch(
      getCannedMsgs(
        () => {},
        () => {}
      )
    );
    time === 0 ? getOldMsgs() : getNewMsgs();
  }, [time]);

  const getNewMsgs = () => {
    // console.warn("page ", page);

    dispatch(
      getMsgs(
        "down",
        moment(chatData[0].create_dt).format("YYYY-MM-DD HH:mm:ss").toString(),
        (data: any) => {
          // setPage(page + 1);
          console.log("new data  ", data);
        },
        () => {}
      )
    );
  };

  const getOldMsgs = () => {
    // console.warn("page ", page);

    dispatch(
      getMsgs(
        "up",
        time === 0
          ? moment.utc(new Date()).format("YYYY-MM-DD HH:mm:ss").toString()
          : moment(chatData[chatData.length - 1].create_dt)
              .format("YYYY-MM-DD HH:mm:ss")
              .toString(),
        (data: any) => {
          // setPage(page + 1);
          console.log("old data  ", data);
        },
        () => {}
      )
    );
  };

  const sendMsgs = (msg: string, msgID: string) => {
    setMsgID("");
    setMsg("");
    dispatch(
      sendMsg(
        msgID.length === 0
          ? { canned_message_id: "", message: msg }
          : { canned_message_id: msgID, message: "" },
        () => {
          getNewMsgs();
        },
        () => {
          console.warn("error");
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <MsgFlatlist item={item} index={index} allData={chatData} />;
  };

  const renderCannedMgs = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setMsg(item.message);
          setMsgID(item.id);
        }}
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
        contentContainerStyle={Styles.scrollmainView}
      >
        {/* Chat Msgs --------------------- */}
        <View
          style={[
            Styles.scrollStyle,
            chatData.length === 0
              ? { alignItems: "center", justifyContent: "center" }
              : {},
          ]}
        >
          {chatData.length === 0 ? (
            <Text style={Styles.noChatText}>No Chat Available</Text>
          ) : (
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
              inverted
              data={chatData}
              onEndReached={() => getOldMsgs()}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
            />
          )}
        </View>
        <View style={Styles.bottomView}>
          {/* Canned Msgs ------------------ */}
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
          {/* Send Msgs ----------------------- */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              value={msg}
              placeholder={Strings.Write_here}
              onChangeText={(text) => {
                setMsg(text);
                setMsgID("");
              }}
              style={Styles.inputTxt}
              multiline
            />
            <TouchableOpacity
              style={Styles.sendBtnView}
              activeOpacity={0.8}
              onPress={() =>
                msg.trim().length === 0 ? null : sendMsgs(msg.trim(), msgID)
              }
            >
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
  },
  scrollStyle: {
    height: "65%",
    width: "100%",
    backgroundColor: Colors.creamWhite,
    marginVertical: vw(1),
  },
  scrollmainView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noChatText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: Colors.violet,
  },
  bottomView: {
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
