import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { CustomHeader, CustomDate, CustomButton } from "../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../utils";
import { hitAbsenceReason, hitAddAbsence } from "./action";

const TYPE_ADD = "add";
const TYPE_UPDATE = "update";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const CURR_TYPE = props.route.params.type === TYPE_UPDATE ? true : false;
  const { params } = props.route;

  const dispatch = useDispatch();

  const input1: any = React.createRef();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [reasonOption, setReasonOption] = useState(-1);
  const [reason, setReason] = useState("");
  const [cLength, setCLength] = useState(0);
  const [reasonLoading, setReasonLoading] = useState(false);

  const { reasonList, currentChild } = useSelector(
    (state: { Absence: any; Home: any }) => ({
      reasonList: state.Absence.reasonList,
      currentChild: state.Home.currentChild,
    })
  );

  useEffect(() => {
    reasonList.length === 0
      ? setReasonLoading(true)
      : setReasonOption(reasonList[0].id);
    dispatch(
      hitAbsenceReason(
        (data: Array<any>) => {
          setReasonOption(data[0].id);
          setReasonLoading(false);
        },
        () => {
          setReasonLoading(false);
        }
      )
    );
  }, []);

  const check = () => {
    let data = {
      child_id: currentChild.child,
      absence_from: CommonFunctions.dateTypeFormat(fromDate.toString(), "ymd"),
      absence_to: CommonFunctions.dateTypeFormat(toDate.toString(), "ymd"),
      absence_reason_id: reasonOption,
      absence_description: reason,
    };
    dispatch(
      hitAddAbsence(
        data,
        () => {
          props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
            msg: Strings.absence_submit_msg,
          });
        },
        () => {}
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      {/* Custom Header -------------- */}
      <CustomHeader
        title={Strings.Create_Absence_Notification}
        onPressBack={() => props.navigation.pop()}
        textStyle={Styles.headerText}
        child={true}
        navigation={props.navigation}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.innerView}
      >
        <View style={Styles.headingView}>
          <Text style={Styles.heading1}>{Strings.hello}</Text>
          <Text style={Styles.heading2}>{Strings.Bob_Parish}</Text>
          <Text style={Styles.heading3}>{Strings.apply_leave_on_time}</Text>
        </View>
        <CustomDate
          heading={Strings.From}
          date={fromDate}
          minDate={new Date()}
          getDate={(date: Date) => {
            setFromDate(date);
            CommonFunctions.DateDifference(date, toDate) < 1
              ? (setToDate(date), setDays(0))
              : setDays(CommonFunctions.DateDifference(fromDate, date));
          }}
        />
        {CURR_TYPE ? null : (
          <CustomDate
            heading={Strings.To}
            date={toDate}
            minDate={fromDate}
            getDate={(date: Date) => {
              setToDate(date);
              setDays(CommonFunctions.DateDifference(fromDate, date));
            }}
          />
        )}
        <Text style={Styles.titleTxt}>{Strings.Number_of_Days}</Text>
        <View style={Styles.inputTxt}>
          <Text style={Styles.dateText}>{days}</Text>
        </View>
        <Text style={Styles.titleTxt}>{Strings.Reason_for_absence}</Text>
        {reasonLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            size="large"
            animating={true}
            style={{ alignSelf: "center" }}
          />
        ) : (
          reasonList.map((item: any) => (
            <View style={Styles.reasonView}>
              <TouchableOpacity
                style={Styles.reasonBtn}
                activeOpacity={0.8}
                onPress={() => setReasonOption(item.id)}
              >
                {reasonOption === item.id ? (
                  <Image source={Images.Radio_Button_Selected_Orange} />
                ) : (
                  <Image source={Images.Radio_Button_Unselected} />
                )}
              </TouchableOpacity>
              <Text style={Styles.dateText}>{item.name}</Text>
            </View>
          ))
        )}
        <View style={Styles.innerHelpView}>
          <TextInput
            ref={input1}
            maxLength={500}
            value={reason}
            onChangeText={(text: string) => {
              cLength <= 500 ? setReason(text) : null, setCLength(text.length);
            }}
            style={Styles.textInputView}
            multiline={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              check();
            }}
          />
          <Text style={Styles.character}>{cLength}/500 Characters</Text>
        </View>
        {props.route.params.type === TYPE_ADD ? (
          <CustomButton
            Text={Strings.Submit}
            onPress={() => {
              // props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
              //   msg: Strings.absence_submit_msg,
              // })
              check();
            }}
            ButtonStyle={{ width: "100%" }}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <CustomButton
              Text={Strings.Cancel}
              lightBtn={true}
              onPress={() => props.navigation.pop()}
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
      </KeyboardAwareScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
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
  dropdown: {
    height: vh(6),
    width: vh(11),
    marginLeft: vw(5),
    marginTop: vh(2),
    tintColor: Colors.violet,
  },
  innerView: {
    width: "100%",
    padding: vh(16),
    alignItems: "center",
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
  reasonView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  reasonBtn: {
    padding: vh(11),
    paddingLeft: 0,
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
