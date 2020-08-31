import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  onPress: Function;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.msgView}>
      <View style={Styles.msgUpperView}>
        <View>
          <Text style={Styles.fromText}>{Strings.Date}</Text>
          <Text style={Styles.dateText}>
            {CommonFunctions.DateFormatter(props.item.date)}
          </Text>
        </View>
      </View>
      <View style={Styles.avatarView}>
        <View style={Styles.childAvatar}>
          <Image
            source={
              CommonFunctions.isNullUndefined(props.item.Child.s3_photo_path)
                ? Images.Profile_Placeholder
                : { uri: props.item.Child.s3_photo_path }
            }
            style={
              CommonFunctions.isNullUndefined(props.item.Child.s3_photo_path)
                ? { width: vh(35), height: vh(38) }
                : { width: "100%", height: "100%", borderRadius: vh(30) }
            }
          />
        </View>
        <View style={Styles.centerNameView}>
          <Text style={Styles.name}>
            {props.item.Child.first_name} {props.item.Child.last_name}
          </Text>
          <Text style={Styles.classText}>
            {props.item.Child.Classroom.name}
          </Text>
        </View>
        <TouchableOpacity
          style={Styles.editView}
          activeOpacity={0.8}
          onPress={() => props.onPress()}
        >
          <Image source={Images.Edit_Icon} style={Styles.editImg} />
        </TouchableOpacity>
      </View>
      <Text style={Styles.msgText}>{props.item.absence_description}</Text>
      {CommonFunctions.isNullUndefined(props.item.update_dt) ? (
        <Text style={Styles.footerText}>
          {CommonFunctions.DateFormatter(props.item.create_dt)}
          <Text style={{ fontSize: vh(12) }}>{" • "}</Text>
          {CommonFunctions.timeFormatter(props.item.create_dt)}
        </Text>
      ) : (
        <Text style={Styles.footerText}>
          {CommonFunctions.DateFormatter(props.item.update_dt)}
          <Text style={{ fontSize: vh(12) }}>{" • "}</Text>
          {CommonFunctions.timeFormatter(props.item.update_dt)}
        </Text>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  msgView: {
    backgroundColor: Colors.fadedPink,
    width: "100%",
    borderRadius: vh(10),
    marginBottom: vh(20),
  },
  msgUpperView: {
    backgroundColor: Colors.lightPink,
    padding: vh(16),
    borderTopRightRadius: vh(10),
    borderTopLeftRadius: vh(10),
    flexDirection: "row",
  },
  fromText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingBottom: vh(8),
  },
  dateText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(16),
  },
  separatorDateView: {
    width: vw(2),
    height: "120%",
    backgroundColor: Colors.separator,
    marginHorizontal: vh(20),
    alignSelf: "center",
  },
  avatarView: {
    flexDirection: "row",
    padding: vh(16),
    alignItems: "center",
    width: "100%",
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
    marginBottom: vh(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vw(1),
    borderColor: Colors.borderGrey,
    backgroundColor: "white",
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  centerNameView: {
    alignItems: "flex-start",
    paddingHorizontal: vw(15),
    justifyContent: "center",
    width: "60%",
  },
  editView: {
    padding: vh(10),
    paddingTop: 0,
  },
  editImg: {
    height: vh(40),
    width: vh(40),
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  msgText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingHorizontal: vh(16),
  },
  footerText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightBlack,
    padding: vh(16),
    paddingTop: vh(0),
  },
});
