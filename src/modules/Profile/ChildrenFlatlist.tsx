import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// custom imports
import { vw, vh, Strings, Images, Colors } from "../../utils";

const teacher =
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
export interface AppProps {
  item: any;
  index: string;
  currentChild: number;
}

export default function App(props: AppProps) {
  const item = props.currentChild === parseInt(props.index) ? props.item : null;

  if (item === null) return null;
  else
    return (
      <>
        <Text style={Styles.nameText}>{item.name}</Text>
        <View>
          <View style={Styles.itemView}>
            <Image source={Images.DOB_Icon} />
            <Text style={Styles.DOBText}>{item.dob}</Text>
          </View>
          <View style={Styles.itemView}>
            <Image source={Images.Center_Icon} />
            <Text style={Styles.DOBText}>{item.class}</Text>
          </View>
        </View>
        <View style={Styles.separatorView} />
        <Text style={Styles.DOBText2}>{Strings.Medical_Information}</Text>
        <View>
          {item.disease.map((data: any) => (
            <View style={Styles.itemView}>
              <Image source={Images.Virus_icon} />
              <Text style={Styles.DOBText}>{data}</Text>
            </View>
          ))}
        </View>
        <View style={Styles.separatorView} />
        <Text style={Styles.DOBText2}>{Strings.Teachers_Information}</Text>
        <View style={Styles.avatarView}>
          <Image source={{ uri: teacher }} style={Styles.childAvatar} />
          <View style={Styles.centerNameView}>
            <Text style={Styles.name}>{item.teacherName}</Text>
            <Text style={Styles.classText}>{item.teacherClass}</Text>
          </View>
        </View>
      </>
    );
}

const Styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vh(7),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    paddingBottom: vh(5),
  },
  DOBText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingLeft: vw(10),
  },
  DOBText2: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingBottom: vw(5),
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.separator,
    margin: vh(10),
  },
  avatarView: {
    flexDirection: "row",
    paddingTop: vh(10),
    alignItems: "center",
    width: "100%",
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
  },
  name: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
  },
  centerNameView: {
    alignItems: "flex-start",
    paddingHorizontal: vw(15),
    justifyContent: "center",
    width: "80%",
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
});
