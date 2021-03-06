import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-date-picker";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomInputText,
  CustomPhoneField,
  CustomDOB,
  CustomToast,
  CustomLoader,
} from "../../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  validate,
  ScreenName,
  ConstantName,
  CommonFunctions,
  API,
  EndPoints,
} from "../../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const input4: any = React.createRef();
  const input5: any = React.createRef();
  const input6: any = React.createRef();
  const input7: any = React.createRef();
  const input8: any = React.createRef();
  const input9: any = React.createRef();
  const [pname, setPname] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [c1name, setC1name] = useState("");
  const [c1DOB, setc1DOB] = useState(new Date());
  const [c2name, setC2name] = useState("");
  const [c2DOB, setc2DOB] = useState(new Date());
  const [c3name, setC3name] = useState("");
  const [c3DOB, setc3DOB] = useState(new Date());
  const [c4name, setC4name] = useState("");
  const [c4DOB, setc4DOB] = useState(new Date());
  const [c5name, setC5name] = useState("");
  const [c5DOB, setc5DOB] = useState(new Date());
  const [checkpname, setCheckPname] = useState(true);
  const [checkphone, setCheckphone] = useState(true);
  const [checkzipcode, setCheckzipcode] = useState(true);
  const [checkemail, setCheckemail] = useState(true);
  const [checkc1name, setCheckc1name] = useState(true);
  const [checkc2name, setCheckc2name] = useState(true);
  const [checkc3name, setCheckc3name] = useState(true);
  const [checkc4name, setCheckc4name] = useState(true);
  const [checkc5name, setCheckc5name] = useState(true);
  const [counter, setCounter] = useState(1);
  const [currentChild, setCurrentChild] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [todayDate, setDate] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const { centerId, calenderId, date, time } = props.route.params;

  const disable = () => {
    return (
      pname.length !== 0 &&
      phone.length !== 1 &&
      zipcode.length !== 0 &&
      email.length !== 0 &&
      c1name.length !== 0
    );
  };

  // Hit Schedule a tour API ---------------------
  const navigating = () => {
    Keyboard.dismiss();

    let childArr: any[] = [];
    childArr = childArr.concat({
      child_name: c1name,
      child_dob: `${CommonFunctions.dateTypeFormat(c1DOB.toString(), "ymd")}`,
    });
    counter > 1
      ? (childArr = childArr.concat({
        child_name: c2name,
        child_dob: `${CommonFunctions.dateTypeFormat(
          c2DOB.toString(),
          "ymd"
        )}`,
      }))
      : null;

    counter > 2
      ? (childArr = childArr.concat({
        child_name: c3name,
        child_dob: `${CommonFunctions.dateTypeFormat(
          c3DOB.toString(),
          "ymd"
        )}`,
      }))
      : null;

    counter > 3
      ? (childArr = childArr.concat({
        child_name: c4name,
        child_dob: `${CommonFunctions.dateTypeFormat(
          c4DOB.toString(),
          "ymd"
        )}`,
      }))
      : null;

    counter > 4
      ? (childArr = childArr.concat({
        child_name: c5name,
        child_dob: `${CommonFunctions.dateTypeFormat(
          c5DOB.toString(),
          "ymd"
        )}`,
      }))
      : null;

    let params = {
      center_id: parseInt(centerId),
      name: pname.trim(),
      phone_number: phone.trim(),
      zip_code: zipcode.trim(),
      email: email.trim(),
      schedule_date_time: CommonFunctions.isNullUndefined(date) ? "" : date,
      children: childArr,
    };

    setLoading(true);
    CommonFunctions.isNullUndefined(date)
      ? API.postApiCall(
        EndPoints.auth.scheduleTour,
        params,
        (success: any) => {
          setLoading(false),
            props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
              path: ScreenName.LANDING_PAGE,
              msg: Strings.tour_success,
            });
        },
        (error: any) => {
          setLoading(false);
        }
      )
      : hitScheduleTour(params);
  };

  // Formatting fields ------------------------------
  const allChilds = (children: Array<any>) => {
    let obj = {
      first_name: children[0].child_name.replace(/\s.*/, ""),
      last_name: children[0].child_name.replace(/\S+\s/, ""),
      dob: children[0].child_dob,
    };
    let i = 1;
    if (children.length > 10) {
      for (i = 1; i < children.length; i++) { }
      (obj.first_name = children[i].child_name.replace(/\s.*/, "")),
        (obj.last_name = children[i].child_name.replace(/\S+\s/, "")),
        (obj.dob = children[i].child_dob);
    }
    return obj;
  };

  // Hit Pre schedule API --------------------
  const hitScheduleTour = (getParams: any) => {
    let getChild = allChilds(getParams.children);
    let params = {
      Lead: {
        first_name: getParams.name.replace(/\s.*/, ""),
        last_name: getParams.name.replace(/\S+\s/, ""),
        address1: "",
        city: "",
        state: "",
        zip: getParams.zip_code,
        mobile_phone: "",
        home_phone: getParams.phone_number,
        work_phone: "",
        email: getParams.email,
      },
      LeadChildren: getChild,
      LeadDetails: {
        message: "This is a test",
      },
    };

    API.postClientApiCall(
      EndPoints.auth.scheduleTourByClient.leadAPIAdd,
      params,
      (response: any) => {
        hitAppointmentAPI(response);
      },
      (error: any) => {
        setLoading(false);
      }
    );
  };

  // Hit Appointment API --------------------------
  const hitAppointmentAPI = (res: any) => {
    let params = {
      calendarID: calenderId,
      datetime: time,
      firstName: res.data.requestObject.Lead.first_name,
      lastName: res.data.requestObject.Lead.last_name,
      email: res.data.requestObject.Lead.email,
      phone: res.data.requestObject.Lead.home_phone,
      timezone: "America/New_York",
    };

    API.postClientApiCall(
      EndPoints.auth.scheduleTourByClient.appointment,
      params,
      (response: any) => {
        hitPostScheduleAPI(res, response);
      },
      (error: any) => {
        setLoading(false);
      }
    );
  };

  // Hit Post Schedule API ----------------------------
  const hitPostScheduleAPI = (oldRes: any, newRes: any) => {
    let params = {
      LeadAction: [
        {
          lead_action_type_id:
            oldRes.data.requestObject.LeadAction[0].lead_action_type_id,
          action_date: oldRes.data.requestObject.LeadAction[0].action_date,
          entered_date: oldRes.data.requestObject.LeadAction[0].entered_date,
          scheduled_date: time,
          appointment_id: newRes.data.Status.OK.id,
        },
      ],
    };
    API.postClientApiCall(
      EndPoints.auth.scheduleTourByClient.leadAPIUpdate,
      params,
      (response: any) => {
        response.data.result === "OK"
          ? (setLoading(false),
            props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
              path: ScreenName.LANDING_PAGE,
              msg: Strings.tour_success,
            }))
          : (CustomToast(response.message), setLoading(false));
      },
      (error: any) => {
        setLoading(false);
      }
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Schedule_a_Tour}
        onPressBack={() => props.navigation.pop()}
        notify={true}
        notifyNumber={3}
      />
      <CustomLoader loading={isLoading} />
      <View style={{ flex: 1, width: "100%" }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Styles.innerView}
        >
          <View style={{ width: "100%" }}>

            {/* Parent's name ---------- */}
            <CustomInputText
              ref={input1}
              titleText={Strings.Parent_Name}
              value={pname}
              onChangeText={(text: string) => {
                checkpname ? null : setCheckPname(true), setPname(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.NAME, pname)
                  ? input2.current.focus()
                  : setCheckPname(false);
              }}
              check={checkpname}
              incorrectText={Strings.Name_error}
            />

            {/* Parent's phone no.----------- */}
            <CustomPhoneField
              value={phone}
              ref={input2}
              onChangeText={(text: string) => {
                checkphone ? null : setCheckphone(true), setPhone(text);
              }}
              check={checkphone}
              onSubmitEditing={() => {
                validate(ConstantName.PHONE, phone)
                  ? input3.current.focus()
                  : setCheckphone(false);
              }}
              mainViewStyle={{ width: "100%" }}
            />

            {/* zipcode -------------- */}
            <CustomInputText
              ref={input3}
              titleText={Strings.Zip_Code}
              value={zipcode}
              onChangeText={(text: string) => {
                checkzipcode ? null : setCheckzipcode(true), setZipcode(text);
              }}
              maxLength={7}
              onSubmitEditing={() => {
                validate(ConstantName.ZIPCODE, zipcode)
                  ? input4.current.focus()
                  : setCheckzipcode(false);
              }}
              check={checkzipcode}
              incorrectText={Strings.Zipcode_error}
              mainViewStyle={Styles.textInput}
              keyboardType={"number-pad"}
            />

            {/* Parent's email --------------- */}
            <CustomInputText
              ref={input4}
              titleText={Strings.Parent_email}
              value={email}
              onChangeText={(text: string) => {
                checkemail ? null : setCheckemail(true), setEmail(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.EMAIL, email)
                  ? input5.current.focus()
                  : setCheckemail(false);
              }}
              check={checkemail}
              incorrectText={Strings.Email_error}
              mainViewStyle={Styles.textInput}
              keyboardType={"email-address"}
            />

            {/* 1st child name --------- */}
            <CustomInputText
              ref={input5}
              titleText={Strings.First_Child_Name}
              value={c1name}
              onChangeText={(text: string) => {
                checkc1name ? null : setCheckc1name(true), setC1name(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.NAME, c1name)
                  ? Keyboard.dismiss()
                  : setCheckc1name(false);
              }}
              check={checkc1name}
              incorrectText={Strings.Name_error}
              mainViewStyle={Styles.textInput}
            />

            {/* 1st child DOB -------------- */}
            <CustomDOB
              value={c1DOB}
              check={true}
              titleText={Strings.First_Child_DOB}
              onPress={() => {
                setCurrentChild(1), setModalOpen(true);
              }}
            />

            {/* 2nd child name --------- */}
            {counter >= 2 ? (
              <View style={{ width: "100%" }}>
                <CustomInputText
                  ref={input6}
                  titleText={Strings.Second_Child_Name}
                  value={c2name}
                  onChangeText={(text: string) => {
                    checkc2name ? null : setCheckc2name(true), setC2name(text);
                  }}
                  onSubmitEditing={() => {
                    validate(ConstantName.NAME, c2name)
                      ? Keyboard.dismiss()
                      : setCheckc2name(false);
                  }}
                  check={checkc2name}
                  incorrectText={Strings.Name_error}
                  mainViewStyle={Styles.textInput}
                />

                {/* 2nd child DOB -------------- */}
                <CustomDOB
                  value={c2DOB}
                  check={true}
                  titleText={Strings.Second_Child_DOB}
                  onPress={() => {
                    setCurrentChild(2), setModalOpen(true);
                  }}
                />
              </View>
            ) : null}

            {/* 3rd child name --------- */}
            {counter >= 3 ? (
              <View style={{ width: "100%" }}>
                <CustomInputText
                  ref={input7}
                  titleText={Strings.Third_Child_Name}
                  value={c3name}
                  onChangeText={(text: string) => {
                    checkc3name ? null : setCheckc3name(true), setC3name(text);
                  }}
                  onSubmitEditing={() => {
                    validate(ConstantName.NAME, c3name)
                      ? Keyboard.dismiss()
                      : setCheckc3name(false);
                  }}
                  check={checkc3name}
                  incorrectText={Strings.Name_error}
                  mainViewStyle={Styles.textInput}
                />

                {/* 3rd child DOB -------------- */}
                <CustomDOB
                  value={c3DOB}
                  check={true}
                  titleText={Strings.Third_Child_DOB}
                  onPress={() => {
                    setCurrentChild(3), setModalOpen(true);
                  }}
                />
              </View>
            ) : null}

            {/* 4th child name --------- */}
            {counter >= 4 ? (
              <View style={{ width: "100%" }}>
                <CustomInputText
                  ref={input8}
                  titleText={Strings.Fourth_Child_Name}
                  value={c4name}
                  onChangeText={(text: string) => {
                    checkc4name ? null : setCheckc4name(true), setC4name(text);
                  }}
                  onSubmitEditing={() => {
                    validate(ConstantName.NAME, c4name)
                      ? Keyboard.dismiss()
                      : setCheckc4name(false);
                  }}
                  check={checkc4name}
                  incorrectText={Strings.Name_error}
                  mainViewStyle={Styles.textInput}
                />

                {/* 4th child DOB -------------- */}
                <CustomDOB
                  value={c4DOB}
                  check={true}
                  titleText={Strings.Fourth_Child_DOB}
                  onPress={() => {
                    setCurrentChild(4), setModalOpen(true);
                  }}
                />
              </View>
            ) : null}

            {/* 5th child name --------- */}
            {counter === 5 ? (
              <View style={{ width: "100%" }}>
                <CustomInputText
                  ref={input9}
                  titleText={Strings.Fifth_Child_Name}
                  value={c5name}
                  onChangeText={(text: string) => {
                    checkc5name ? null : setCheckc5name(true), setC5name(text);
                  }}
                  onSubmitEditing={() => {
                    validate(ConstantName.NAME, c1name)
                      ? Keyboard.dismiss()
                      : setCheckc5name(false);
                  }}
                  check={checkc5name}
                  incorrectText={Strings.Name_error}
                  mainViewStyle={Styles.textInput}
                />

                {/* 5th child DOB -------------- */}
                <CustomDOB
                  value={c5DOB}
                  check={true}
                  titleText={Strings.Fifth_Child_DOB}
                  onPress={() => {
                    setCurrentChild(5), setModalOpen(true);
                  }}
                />
              </View>
            ) : null}
          </View>
          {counter !== 1 ? (
            <TouchableOpacity
              style={Styles.removeView}
              activeOpacity={0.8}
              onPress={() => setCounter(counter - 1)}
            >
              <Text style={Styles.removeText}>{Strings.Remove_Child}</Text>
            </TouchableOpacity>
          ) : null}

          {/* Add New Child Button --------- */}
          {counter !== 5 ? (
            <CustomButton
              Text={
                counter === 1
                  ? Strings.Add_Second_Child
                  : counter === 2
                    ? Strings.Add_Third_Child
                    : counter === 3
                      ? Strings.Add_Fourth_Child
                      : Strings.Add_Fifth_Child
              }
              onPress={() => (counter <= 5 ? setCounter(counter + 1) : null)}
              lightBtn={true}
              ButtonStyle={Styles.btn}
            />
          ) : null}

          {/* Schedule Tour Button ------------ */}
          <CustomButton
            Text={Strings.Schedule_Tour}
            activeOpacity={disable() ? 0.8 : 1}
            onPress={() =>
              disable()
                ? validate(ConstantName.NAME, pname)
                  ? validate(ConstantName.PHONE, phone)
                    ? validate(ConstantName.ZIPCODE, zipcode)
                      ? validate(ConstantName.EMAIL, email)
                        ? validate(ConstantName.NAME, c1name)
                          ? counter >= 2
                            ? validate(ConstantName.NAME, c2name)
                              ? counter >= 3
                                ? validate(ConstantName.NAME, c3name)
                                  ? counter >= 4
                                    ? validate(ConstantName.NAME, c4name)
                                      ? counter === 5
                                        ? validate(ConstantName.NAME, c5name)
                                          ? navigating()
                                          : (setCheckc5name(false),
                                            input9.current.focus())
                                        : navigating()
                                      : (setCheckc4name(false),
                                        input7.current.focus())
                                    : navigating()
                                  : (setCheckc3name(false),
                                    input7.current.focus())
                                : navigating()
                              : (setCheckc2name(false), input6.current.focus())
                            : navigating()
                          : (setCheckc1name(false), input5.current.focus())
                        : (setCheckemail(false), input4.current.focus())
                      : (setCheckzipcode(false), input3.current.focus())
                    : (setCheckphone(false), input2.current.focus())
                  : (setCheckPname(false), input1.current.focus())
                : null
            }
            ButtonStyle={[
              Styles.btn,
              {
                backgroundColor: disable()
                  ? Colors.violet
                  : Colors.disableViolet,
              },
            ]}
          />

          {/* Date Picker Modal ------------------------------- */}
          <Modal animationType="slide" transparent={true} visible={modalOpen}>
            <TouchableOpacity
              style={Styles.topModalView}
              onPress={() => setModalOpen(false)}
            />
            <View style={Styles.modalView}>
              <DatePicker
                maximumDate={new Date()}
                date={todayDate}
                mode="date"
                onDateChange={(text: Date) => {
                  setDate(text);
                  currentChild === 1
                    ? setc1DOB(text)
                    : currentChild === 2
                      ? setc2DOB(text)
                      : currentChild === 3
                        ? setc3DOB(text)
                        : currentChild === 4
                          ? setc4DOB(text)
                          : currentChild === 5
                            ? setc5DOB(text)
                            : null;
                }}
              />
              <CustomButton
                Text={Strings.set_DOB}
                onPress={() => setModalOpen(false)}
              />
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    width: "100%",
  },
  textInput: {
    marginTop: vh(10),
  },
  btn: {
    width: "100%",
    marginTop: vh(20),
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
  },
  inputTxt: {
    height: vh(48),
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
    width: "100%",
    marginTop: vh(10),
    marginBottom: vh(15),
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.veryLightGrey,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dobText: {
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
  },
  dobView: {
    alignItems: "center",
    width: "100%",
    marginTop: vh(5),
  },
  topModalView: {
    width: "100%",
    flex: 0.65,
    backgroundColor: "transparent",
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    flex: 0.35,
    paddingVertical: vh(30),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  removeView: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    padding: vw(5),
  },
  removeText: {
    alignSelf: "flex-end",
    color: Colors.violet,
    fontSize: vh(12),
    fontFamily: "Nunito-SemiBold",
  },
});
