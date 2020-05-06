import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";

// custom imports
import { CustomHeader, CustomDate, CustomButton } from "../../Components";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../utils";

const TYPE_ADD = "add";
const TYPE_UPDATE = "update";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [days, setDays] = useState("0");
  const [reason, setReason] = useState("");
  const [cLength, setCLength] = useState(0);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={Styles.mainView}
    >
      {/* Custom Header -------------- */}
      <CustomHeader
        title={Strings.Create_Absence_Notification}
        onPressBack={() => props.navigation.pop()}
        textStyle={Styles.headerText}
      />
      <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
        <Text style={Styles.childHeaderText}>Alex </Text>
        <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
      </TouchableOpacity>
      <View style={Styles.innerView}>
        <View style={Styles.headingView}>
          <Text style={Styles.heading1}>{Strings.hello}</Text>
          <Text style={Styles.heading2}>{Strings.Bob_Parish}</Text>
          <Text style={Styles.heading3}>{Strings.apply_leave_on_time}</Text>
        </View>
        <CustomDate
          heading={Strings.From}
          getDate={(date: Date) => {
            setFromDate(date);
            let difference: number = toDate.getDate() - fromDate.getDate();
            difference > 0 ? setDays(difference.toString()) : 0;
          }}
        />
        <CustomDate
          heading={Strings.To}
          minDate={fromDate}
          getDate={(date: Date) => {
            setToDate(date);
            let difference: number = toDate.getDate() - fromDate.getDate();
            difference > 0 ? setDays(difference.toString()) : 0;
          }}
        />
        <Text style={Styles.titleTxt}>{Strings.Number_of_Days}</Text>
        <View style={Styles.inputTxt}>
          <Text style={Styles.dateText}>{days}</Text>
        </View>
        <Text style={Styles.titleTxt}>{Strings.Reason_for_absence}</Text>
        <View style={Styles.innerHelpView}>
          <TextInput
            ref={input2}
            maxLength={500}
            value={reason}
            onChangeText={(text: string) => {
              cLength <= 500 ? setReason(text) : null, setCLength(text.length);
            }}
            style={Styles.textInputView}
            multiline={true}
            onSubmitEditing={() =>
              props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                msg: Strings.absence_submit_msg,
              })
            }
          />
          <Text style={Styles.character}>{cLength}/500 Characters</Text>
        </View>
        {props.route.params.type === TYPE_ADD ? (
          <CustomButton
            Text={Strings.Submit}
            onPress={() =>
              props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                msg: Strings.absence_submit_msg,
              })
            }
            ButtonStyle={{ width: "100%" }}
          />
        ) : (
          <View style={{ flexDirection: "row" }}>
            <CustomButton
              Text={Strings.Cancel}
              lightBtn={true}
              onPress={() =>
                props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                  msg: Strings.absence_submit_msg,
                })
              }
              ButtonStyle={{ width: "45%" }}
            />
            <CustomButton
              Text={Strings.Update}
              onPress={() =>
                props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                  msg: Strings.absence_update_msg,
                })
              }
              ButtonStyle={{ width: "45%" }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerText: {
    alignSelf: "flex-start",
    paddingLeft: vw(46),
    width: "75%",
  },
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    right: vw(16),
    top: vh(43),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
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
  innerView: {
    alignItems: "center",
    width: "100%",
    padding: vh(16),
  },
  headingView: {
    backgroundColor: Colors.lightPink,
    width: "100%",
    borderRadius: vh(10),
    alignItems: "flex-start",
    padding: vh(15),
  },
  heading1: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: Colors.pink,
  },
  heading2: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(20),
    color: Colors.pink,
    paddingVertical: vh(5),
  },
  heading3: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(15),
    color: Colors.lightGrey,
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    marginTop: vh(24),
    alignSelf: "flex-start",
    color: Colors.lightBlack,
  },
  inputTxt: {
    flexDirection: "row",
    height: vh(48),
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
    width: "100%",
    marginTop: vh(10),
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.veryLightGrey,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dateText: {
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
    color: Colors.lightBlack,
  },
  innerHelpView: {
    width: vw(380),
    alignItems: "center",
    backgroundColor: Colors.veryLightGrey,
    borderRadius: vh(8),
    padding: vh(10),
    marginVertical: vh(10),
  },
  textInputView: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.veryLightGrey,
    width: "100%",
    borderTopLeftRadius: vh(8),
    borderTopRightRadius: vh(8),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingHorizontal: vw(6),
    paddingVertical: vh(4),
  },
  character: {
    color: Colors.characterGrey,
    fontSize: vh(14),
    fontFamily: "Nunito-Regular",
    alignSelf: "flex-end",
  },
});
