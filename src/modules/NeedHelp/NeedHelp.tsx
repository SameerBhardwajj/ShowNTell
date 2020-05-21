import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getManufacturer } from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomMenuList,
  CustomInputText,
  CustomToast,
} from "../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  validate,
  ScreenName,
  ConstantName,
  API,
  EndPoints,
} from "../../utils";
import { needHelpAPI } from "./action";
const pkg = require("../../../package.json");
import SchoolFlatlist from "./SchoolFlatlist";

const SELECT_SCHOOL = "Select School";
const APPLICATION = "Application\n";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const [school, setSchool] = useState(SELECT_SCHOOL);
  const [center, setCenter] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [help, setHelp] = useState("");
  const [cLength, setCLength] = useState(0);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [device, setDevice] = useState("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  React.useEffect(() => {
    getManufacturer()
      .then((deviceName) => {
        setDevice(deviceName);
      })
      .catch((err) => CustomToast(err));
    schoolAPI();
  }, []);

  const schoolAPI = () => {
    API.getApiCall(
      EndPoints.auth.fetchAllCenters(page),
      {},
      (success: any) => {
        setList(list.concat(success.data.response));
      },
      (error: any) => {
        CustomToast(error);
      }
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SchoolFlatlist
        item={item}
        index={index}
        onPress={() => {
          setShowList(!showList), setCenter(item.id), setSchool(item.name);
        }}
      />
    );
  };

  const disable = () => {
    return school !== SELECT_SCHOOL && email.length !== 0 && name.length !== 0;
  };

  const check = () => {
    validate(ConstantName.NAME, name)
      ? validate(ConstantName.EMAIL, email)
        ? (setIsLoading(true),
          dispatch(
            needHelpAPI(
              device,
              Platform.Version.toString(),
              pkg.version.toString(),
              center.toString(),
              name,
              email,
              help,
              () => {
                setIsLoading(false);
                props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                  path: props.route.params.path,
                  msg: Strings.ticket_submitted,
                });
              },
              () => setIsLoading(false)
            )
          ))
        : setCheckEmail(false)
      : setCheckName(false);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={Styles.mainView}>
        <CustomHeader
          title={Strings.Need_Help}
          onPressBack={() =>
            props.route.params.path === ScreenName.TAB_NAVIGATOR
              ? props.navigation.navigate(ScreenName.TAB_NAVIGATOR)
              : props.navigation.pop()
          }
        />
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
        <View style={Styles.innerView}>
          <View style={Styles.deviceMainView}>
            {/* Device -------------------- */}
            <View
              style={[
                Styles.deviceView,
                { backgroundColor: Colors.lightGreen },
              ]}
            >
              <Image source={Images.Phone_Icon} />
              <Text style={[Styles.text, { color: Colors.green }]}>
                {Strings.Device}
              </Text>
              <Text
                numberOfLines={1}
                style={[Styles.text, { color: Colors.green, paddingTop: 0 }]}
              >
                {device}
              </Text>
            </View>
            {/* Version -------------------- */}
            <View
              style={[Styles.deviceView, { backgroundColor: Colors.lightPink }]}
            >
              <Image
                source={
                  Platform.OS === "ios"
                    ? Images.IOS_Version_icon
                    : Images.Android_verson_Icon
                }
                style={{ tintColor: Colors.pink }}
              />
              <Text
                style={[
                  Styles.text,
                  {
                    color: Colors.pink,
                    textTransform:
                      Platform.OS === "ios" ? "uppercase" : "capitalize",
                  },
                ]}
              >
                {Platform.OS}
                {"\nV "}
                {Platform.Version.toString()}
              </Text>
            </View>
            {/* Application -------------------- */}
            <View
              style={[
                Styles.deviceView,
                { backgroundColor: Colors.lightWaterBlue },
              ]}
            >
              <Image
                source={Images.Application_icon}
                style={{ tintColor: Colors.waterBlue }}
              />
              <Text style={[Styles.text, { color: Colors.waterBlue }]}>
                {APPLICATION}
                {"V "}
                {pkg.version.toString()}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            {/* School name --------------------- */}
            <Text style={[Styles.titleTxt, { marginTop: vh(20) }]}>
              {Strings.School_Name}
            </Text>
            <TouchableOpacity
              style={Styles.inputTxtView}
              activeOpacity={0.8}
              onPress={() => setShowList(true)}
            >
              <Text style={Styles.schoolText}>{school}</Text>
              <Image source={Images.Dropdown_icon} />
            </TouchableOpacity>
            {/* School Flatlist -------------- */}
            {showList && list.length > 1 ? (
              <FlatList
                style={Styles.flatlistView}
                data={list}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={renderItems}
                onEndReached={() => {
                  setPage(page + 1), schoolAPI();
                }}
                onEndReachedThreshold={0.5}
              />
            ) : null}

            <CustomInputText
              ref={input1}
              value={name}
              onChangeText={(text: string) => {
                checkName ? null : setCheckName(true), setName(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.NAME, name)
                  ? input2.current.focus()
                  : setCheckName(false);
              }}
              titleText={Strings.Parent_Name}
              check={checkName}
              incorrectText={Strings.Name_error}
            />
            <CustomInputText
              ref={input2}
              mainViewStyle={Styles.menuView}
              value={email}
              onChangeText={(text: string) => {
                checkEmail ? null : setCheckEmail(true), setEmail(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.EMAIL, email)
                  ? input3.current.focus()
                  : setCheckEmail(false);
              }}
              titleText={Strings.Parent_email}
              check={checkEmail}
              incorrectText={Strings.Email_error}
            />
            <View style={Styles.helpView}>
              <Text style={Styles.titleTxt}>{Strings.How_can_we_help_you}</Text>
              <View style={Styles.innerHelpView}>
                <TextInput
                  ref={input3}
                  maxLength={500}
                  value={help}
                  onChangeText={(text: string) => {
                    cLength <= 500 ? setHelp(text) : null,
                      setCLength(text.length);
                  }}
                  style={Styles.textInputView}
                  multiline={true}
                  onSubmitEditing={() => (disable() ? check() : null)}
                />
                <Text style={Styles.character}>{cLength}/500 Characters</Text>
              </View>
            </View>
            <CustomButton
              Text={Strings.Submit}
              onPress={() => (disable() ? check() : null)}
              activeOpacity={disable() ? 0.8 : 1}
              ButtonStyle={{
                width: "100%",
                alignSelf: "center",
                marginTop: vh(30),
                backgroundColor: disable()
                  ? Colors.violet
                  : Colors.disableViolet,
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  deviceMainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  deviceView: {
    alignItems: "center",
    justifyContent: "center",
    padding: vh(10),
    width: "30%",
    borderRadius: vh(8),
    height: vh(106),
  },
  text: {
    paddingTop: vh(14),
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    textAlign: "center",
  },
  menuView: {
    marginVertical: vh(28),
  },
  inputTxtView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: Colors.veryLightGrey,
    height: vh(48),
    marginVertical: vh(10),
    borderRadius: vh(50),
    borderWidth: vh(1),
    borderColor: Colors.borderGrey,
    paddingHorizontal: vw(25),
  },
  schoolText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.lightBlack,
  },
  flatlistView: {
    position: "absolute",
    top: vh(50),
    zIndex: 99,
    width: "100%",
    borderColor: Colors.borderGrey,
    borderWidth: vw(1),
    borderRadius: vw(10),
    height: vh(300),
  },
  helpView: {
    alignItems: "center",
    width: "100%",
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    color: Colors.titleColor,
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
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
});
