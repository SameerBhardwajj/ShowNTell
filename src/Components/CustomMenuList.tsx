import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Strings, Colors, vw, vh, Images, API, EndPoints } from "../utils";
import CustomToast from "./CustomToast";

export interface AppProps {
  titleText: string;
  viewStyle?: Object;
  onChangeText: Function;
  currentText: string;
  dropDownView?: Object;
  check: boolean;
  data: Array<any>;
}

const CustomInputText = React.forwardRef((props: AppProps, ref: any) => {
  // React.useEffect(() => {
  //   API.getApiCall(
  //     EndPoints.auth.centerList,
  //     undefined,
  //     (success: any) => {
  //       let temp = success.data.response;
  //       temp = temp.map((item: any) => {
  //         return {
  //           id: item.id,
  //           value: item.name,
  //           address1: item.address1,
  //           phone: item.phone,
  //           email: item.email,
  //           center_image: item.center_image,
  //           center_lat: item.center_lat,
  //           center_long: item.center_long,
  //           Centertype: item.Centertype,
  //         };
  //       });
  //       setList(list.concat(temp));
  //     },
  //     (error: any) => CustomToast(error)
  //   );
  // }, []);

  return (
    <View style={[Styles.mainView, props.viewStyle]}>
      <View style={Styles.textView}>
        <Text
          style={[
            Styles.titleTxt,
            { color: props.check ? Colors.titleColor : Colors.pink },
          ]}
        >
          {props.titleText}
        </Text>
        {props.check ? null : (
          <Text style={Styles.incorrectText}>{Strings.SchoolName_error}</Text>
        )}
      </View>
      <Dropdown
        rippleOpacity={0}
        rippleDuration={0}
        renderBase={() => {
          return (
            <View style={Styles.inputTxtView}>
              <Text
                style={[
                  Styles.centreTxt,
                  {
                    color:
                      props.currentText === Strings.Select_School
                        ? Colors.placeholderGrey
                        : "black",
                  },
                ]}
              >
                {props.currentText}
              </Text>
              <Image source={Images.Dropdown_icon} />
            </View>
          );
        }}
        pickerStyle={[
          { width: "85%", marginHorizontal: vw(22) },
          props.dropDownView,
        ]}
        useNativeDriver={true}
        containerStyle={{ width: "100%" }}
        fontSize={vh(16)}
        data={props.data}
        itemCount={5}
        onChangeText={(value, i, data) => props.onChangeText(value, i, data)}
        onLayout={(event: any) => {
          console.warn(event.nativeEvent);
        }}
      />
    </View>
  );
});
export default CustomInputText;

const Styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    width: "100%",
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    color: Colors.titleColor,
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
  incorrectText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.pink,
    paddingLeft: vw(40),
  },
  centreTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
});
