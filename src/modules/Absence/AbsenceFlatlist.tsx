import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Strings, vw, vh, Images, Colors } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.msgView}>
      <View style={Styles.msgUpperView}>
        <View>
          <Text style={Styles.fromText}>{Strings.From}</Text>
          <Text style={Styles.dateText}>{props.item.from}</Text>
        </View>
        <View style={Styles.separatorDateView} />
        <View>
          <Text style={Styles.fromText}>{Strings.To}</Text>
          <Text style={Styles.dateText}>{props.item.to}</Text>
        </View>
      </View>
      <View style={Styles.avatarView}>
        <Image source={Images.any} style={Styles.childAvatar} />
        <View style={Styles.centerNameView}>
          <Text style={Styles.name}>{props.item.name}</Text>
          <Text style={Styles.classText}>{props.item.class}</Text>
        </View>
        <TouchableOpacity style={Styles.editView}>
          <Image source={Images.Edit_Icon} style={Styles.editImg} />
        </TouchableOpacity>
      </View>
      <Text style={Styles.msgText}>{props.item.msg}</Text>
      <Text style={Styles.footerText}>
        {props.item.createdOn} <Text style={{ fontSize: vh(30) }}>.</Text>{" "}
        {props.item.time}
      </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  msgView: {
    backgroundColor: Colors.fadedPink,
    width: "100%",
    borderRadius: vh(10),
    marginBottom: vh(20)
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
    height: vh(60),
    width: vh(60),
    borderRadius: vh(30),
    marginBottom: vh(10),
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
    padding: vh(16),
  },
  footerText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightBlack,
    padding: vh(16),
    paddingTop: vh(8),
  },
});
