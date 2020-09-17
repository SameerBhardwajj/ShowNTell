import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// custom imports
import {
  CustomHeader,
  CustomDate,
  CustomButton,
  CustomLoader,
} from "../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../utils";
import { hitAbsenceReason, hitAddAbsence, hitUpdateAbsence } from "./action";

const iPhoneX = Dimensions.get("window").height >= 812;
const TYPE_ADD = "add";
const TYPE_UPDATE = "update";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const CURR_TYPE = props.route.params.type === TYPE_UPDATE ? true : false;
  const { item } = props.route.params;

  const dispatch = useDispatch();

  const input1: any = React.createRef();
  const [fromDate, setFromDate] = useState(
    CURR_TYPE ? new Date(item.date) : new Date()
  );
  const [toDate, setToDate] = useState(new Date());
  const [days, setDays] = useState(1);
  const [reasonOption, setReasonOption] = useState(
    CURR_TYPE ? item.absence_reason_id : -1
  );
  const [reason, setReason] = useState(
    CURR_TYPE ? item.absence_description : ""
  );
  const [cLength, setCLength] = useState(0);
  const [reasonLoading, setReasonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { loginData, classroomChild, reasonList } = useSelector(
    (state: {
      Login: any;
      ClassroomSchedule: any;
      Absence: any;
      Home: any;
    }) => ({
      loginData: state.Login.loginData,
      classroomChild: state.ClassroomSchedule.classroomChild,
      reasonList: state.Absence.reasonList,
      // currentChild: state.Home.currentChild,
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
    Keyboard.dismiss();
    console.log("my dates", fromDate, toDate);
    setIsLoading(true);
    let data = {
      child_id: CURR_TYPE ? item.child_id : classroomChild.id,
      absence_from: moment(fromDate).utc().format("YYYY-MM-DD"),
      absence_to: moment(toDate).utc().format("YYYY-MM-DD"),
      absence_reason_id: reasonOption,
      absence_description: reason.trim(),
    };
    console.warn(data);
    
    dispatch(
      hitAddAbsence(
        data,
        () => {
          setIsLoading(false);
          props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
            msg: Strings.absence_submit_msg,
          });
        },
        () => {
          setIsLoading(false);
        }
      )
    );
  };

  const checkUpdate = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    let data = {
      absence_id: item.id,
      child_id: CURR_TYPE ? item.child_id : classroomChild.id,
      date: CommonFunctions.dateTypeFormat(
        fromDate.toLocaleDateString(),
        "ymd"
      ),
      absence_reason_id: reasonOption,
      absence_description: reason.trim(),
    };
    dispatch(
      hitUpdateAbsence(
        data,
        () => {
          setIsLoading(false);
          props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
            msg: Strings.absence_update_msg,
          });
        },
        () => {
          setIsLoading(false);
        }
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      {/* Custom Header -------------- */}
      <CustomHeader
        title={
          CURR_TYPE
            ? Strings.Edit_Absence_Notification
            : Strings.Create_Absence_Notification
        }
        onPressBack={() => props.navigation.pop()}
        textStyle={CURR_TYPE ? {} : Styles.headerText}
        navigation={props.navigation}
      />
      {CURR_TYPE ? null : (
        <TouchableOpacity
          activeOpacity={loginData.Children.length > 1 ? 0.8 : 1}
          style={Styles.childHeader}
          onPress={() =>
            loginData.Children.length > 1
              ? props.navigation.navigate(ScreenName.SCHEDULE_CHILD_MODAL, {
                  child: loginData.Children,
                })
              : null
          }
        >
          <Text style={Styles.childHeaderText}>{classroomChild.name}</Text>
          {loginData.Children.length > 1 ? (
            <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
          ) : null}
        </TouchableOpacity>
      )}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Styles.innerView}
      >
        <CustomLoader loading={isLoading} />
        <View style={Styles.headingView}>
          <Text style={Styles.heading1}>{Strings.hello}</Text>
          <Text
            style={Styles.heading2}
          >{`${loginData.first_name} ${loginData.last_name}`}</Text>
          <Text style={Styles.heading3}>{Strings.apply_leave_on_time}</Text>
        </View>
        <CustomDate
          heading={CURR_TYPE ? Strings.Date : Strings.From}
          date={fromDate}
          minDate={new Date()}
          getDate={(date: Date) => {
            setFromDate(date);
            CommonFunctions.DateDifference(date, toDate) <= 1
              ? (setToDate(date), setDays(1))
              : setDays(CommonFunctions.DateDifference(date, toDate));
          }}
        />
        {CURR_TYPE ? null : (
          <>
            <CustomDate
              heading={Strings.To}
              date={toDate}
              minDate={fromDate}
              getDate={(date: Date) => {
                CommonFunctions.DateDifference(fromDate, date) <= 1
                  ? setToDate(fromDate)
                  : setToDate(date);
                setDays(CommonFunctions.DateDifference(fromDate, date));
              }}
            />

            <Text style={Styles.titleTxt}>{Strings.Number_of_Days}</Text>
            <View style={Styles.inputTxt}>
              <Text style={Styles.dateText}>{days}</Text>
            </View>
          </>
        )}
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
            // onSubmitEditing={() => {
            //   Keyboard.dismiss();
            //   check();
            // }}
          />
          <Text style={Styles.character}>{cLength}/500 Characters</Text>
        </View>
        {!CURR_TYPE ? (
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
                // props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                //   msg: Strings.absence_update_msg,
                // })
                checkUpdate()
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
    top: iPhoneX ? vh(40) : vh(30),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
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
    maxHeight: vh(150),
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
