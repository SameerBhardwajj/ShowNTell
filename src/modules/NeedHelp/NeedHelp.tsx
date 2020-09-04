import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList,
  Keyboard,
  BackHandler,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  getModel,
  getVersion,
  getSystemVersion,
} from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomInputText,
  CustomToast,
  CustomLoader,
  CustomSearchBar,
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
  CommonFunctions,
} from "../../utils";
import { needHelpAPI } from "./action";
import SchoolFlatlist from "./SchoolFlatlist";

const SELECT_SCHOOL = "Select School";
const APPLICATION = "Application\n";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const Login = props.route.params.path === ScreenName.TAB_NAVIGATOR;

  const { loginData } = useSelector((state: { Login: any }) => ({
    loginData: state.Login.loginData,
  }));
  const dispatch = useDispatch();
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const [school, setSchool] = useState(
    Login ? loginData.centerData.name : SELECT_SCHOOL
  );
  const [center, setCenter] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [help, setHelp] = useState("");
  const [cLength, setCLength] = useState(0);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  React.useEffect(() => {
    schoolAPI();
    BackHandler.addEventListener("hardwareBackPress", () => {
      props.navigation.pop();
      return true;
    });
  }, [BackHandler]);

  const schoolAPI = () => {
    Login
      ? null
      : (setIsLoading(true),
        API.getApiCall(
          EndPoints.auth.fetchAllCenters,
          {},
          (success: any) => {
            let temp = success.data.response.slice(0);
            temp.sort((a: any, b: any) =>
              a.name > b.name ? 1 : b.name > a.name ? -1 : 0
            );
            setList(temp);
            setSearchData(temp);
            setIsLoading(false);
          },
          (error: any) => {
            setIsLoading(false);
            CustomToast(error.data.message);
          }
        ));
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SchoolFlatlist
        item={item}
        index={index}
        onPress={() => {
          setShowList(!showList),
            setCenter(item.id),
            setSchool(item.name),
            setQuery(""),
            setSearchData(list);
        }}
      />
    );
  };

  const disable = () => {
    return (
      school !== SELECT_SCHOOL &&
      email.trim().length !== 0 &&
      name.trim().length !== 0
    );
  };

  const check = () => {
    validate(ConstantName.NAME, name)
      ? validate(ConstantName.EMAIL, email)
        ? (setIsLoading(true),
          dispatch(
            needHelpAPI(
              getModel(),
              getSystemVersion(),
              getVersion(),
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

  const search = (query: string) => {
    let res: any = CommonFunctions.binarySearch(query, list);
    setSearchData(res);
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Need_Help}
        onPressBack={() =>
          Login
            ? props.navigation.navigate(ScreenName.TAB_NAVIGATOR)
            : props.navigation.pop()
        }
      />
      <CustomLoader loading={isLoading} />
      <View style={{ flex: 1, width: "100%" }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
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
                  {getModel()}
                </Text>
              </View>
              {/* Version -------------------- */}
              <View
                style={[
                  Styles.deviceView,
                  { backgroundColor: Colors.lightPink },
                ]}
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
                  {getSystemVersion()}
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
                  {getVersion()}
                </Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              {/* School name --------------------- */}
              <Text style={[Styles.titleTxt, Styles.menuView]}>
                {Strings.School_Name}
              </Text>
              <TouchableOpacity
                style={Styles.inputTxtView}
                activeOpacity={Login ? 1 : 0.8}
                onPress={() => {
                  Login ? null : (setShowList(true), Keyboard.dismiss());
                }}
              >
                <Text style={Styles.schoolText}>{school}</Text>
                {Login ? null : <Image source={Images.Dropdown_icon} />}
              </TouchableOpacity>
              <CustomInputText
                ref={input1}
                mainViewStyle={Styles.menuView}
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
                <Text style={Styles.titleTxt}>
                  {Strings.How_can_we_help_you}
                </Text>
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
                    returnKeyType="next"
                  />
                  <Text style={Styles.character}>{cLength}/500 Characters</Text>
                </View>
              </View>
              <CustomButton
                Text={Strings.Submit}
                onPress={() => {
                  Keyboard.dismiss();
                  disable() ? check() : null;
                }}
                activeOpacity={disable() ? 0.8 : 1}
                ButtonStyle={[
                  Styles.BtnStyle,
                  {
                    backgroundColor: disable()
                      ? Colors.violet
                      : Colors.disableViolet,
                  },
                ]}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Modal animationType="slide" transparent={true} visible={showList}>
        <KeyboardAwareScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Styles.flatlistView}
        >
          <TouchableOpacity
            style={{ padding: vw(20), alignSelf: "flex-end" }}
            activeOpacity={0.8}
            onPress={() => {
              setQuery("");
              setSearchData(list);
              setShowList(false);
            }}
          >
            <Image source={Images.Cancel_Icon} />
          </TouchableOpacity>
          <CustomSearchBar
            value={query}
            onChangeText={(text: string) => {
              setQuery(text);
              text.length === 0 ? setSearchData(list.slice(0)) : null;
              search(text);
            }}
            placeholder={Strings.Search}
            onSubmitEditing={() => Keyboard.dismiss()}
            onPressCancel={() => {
              setQuery(""), setSearchData([]);
            }}
            mainViewStyle={{ width: "90%", alignSelf: "center" }}
          />
          {query.length !== 0 && searchData.length === 0 ? (
            <Text style={Styles.noDataText}>{Strings.No_data_Found}</Text>
          ) : (
            <FlatList
              nestedScrollEnabled={true}
              data={query.length === 0 ? list : searchData}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
              bounces={false}
              renderItem={renderItems}
            />
          )}
        </KeyboardAwareScrollView>
      </Modal>
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
  deviceMainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  deviceView: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    borderRadius: vh(8),
    height: vh(106),
  },
  text: {
    paddingTop: vh(14),
    fontFamily: "Nunito-Bold",
    fontSize: vh(13),
    textAlign: "center",
  },
  menuView: {
    marginTop: vh(28),
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
    paddingVertical: vh(30),
    width: "100%",
    backgroundColor: "white",
    height: "100%",
  },
  helpView: {
    alignItems: "center",
    width: "100%",
    marginTop: vh(28),
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    color: Colors.titleColor,
  },
  BtnStyle: {
    width: "100%",
    alignSelf: "center",
    marginTop: vh(30),
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
  noDataText: {
    alignSelf: "center",
    paddingTop: vh(10),
    color: Colors.violet,
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
  },
});
