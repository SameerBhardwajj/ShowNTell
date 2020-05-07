import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

// custom imports
import { vw, vh, Strings, Images, Colors, ScreenName } from "../../utils";

const img =
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";

export interface AppProps {}

export default function App(props: AppProps) {
  const [currentChild, setCurrentChild] = useState(1);
  return (
    <View style={Styles.mainView}>
      <View style={Styles.contactView}>
        <TouchableOpacity style={Styles.imageView}>
          <Image
            source={{ uri: img }}
            resizeMethod="resize"
            resizeMode="cover"
            style={{
              height: vh(80),
              width: vh(80),
              borderRadius: vh(40),
              borderWidth: vw(5),
              borderColor: Colors.violet,
            }}
          />
        </TouchableOpacity>
        <View style={Styles.childView}>
          <Text style={Styles.nameText}>Alex Parish</Text>
          <View>
            <View style={Styles.itemView}>
              <Image source={Images.DOB_Icon} />
              <Text style={Styles.DOBText}>February 21, 2016</Text>
            </View>
            <View style={Styles.itemView}>
              <Image source={Images.Center_Icon} />
              <Text style={Styles.DOBText}>Infant -A</Text>
            </View>
          </View>
          <View style={Styles.separatorView} />
          <Text style={Styles.DOBText2}>{Strings.Medical_Information}</Text>
          <View>
            <View style={Styles.itemView}>
              <Image source={Images.Virus_icon} />
              <Text style={Styles.DOBText}>Asthama</Text>
            </View>
            <View style={Styles.itemView}>
              <Image source={Images.Virus_icon} />
              <Text style={Styles.DOBText}>Skin Rashes</Text>
            </View>
          </View>
          <View style={Styles.separatorView} />
          <Text style={Styles.DOBText2}>{Strings.Teachers_Information}</Text>
          <View style={Styles.avatarView}>
            <Image source={Images.any} style={Styles.childAvatar} />
            <View style={Styles.centerNameView}>
              <Text style={Styles.name}>Natasha Jacobs</Text>
              <Text style={Styles.classText}>Infant A</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: vh(16),
  },
  contactView: {
    backgroundColor: "transparent",
    paddingTop: vh(8),
    alignItems: "center",
    width: "100%",
    borderRadius: vh(8),
    marginBottom: vh(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imageView: {},
  childView: {
    width: "100%",
    backgroundColor: "white",
    marginTop: vh(20),
    padding: vh(16),
    borderRadius: vw(10),
  },
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

// API Data
const DATA = [
  { img: img },
  { img: img },
  { img: img },
  { img: img },
  { img: img },
];
