import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

// custom imports
import { vw, vh, Colors } from "../../utils";
import ChildrenFlatlist from "./ChildrenFlatlist";

const img =
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";

export interface AppProps {}

export default function App(props: AppProps) {
  const [currentChild, setCurrentChild] = useState(1);

  const renderChild = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setCurrentChild(parseInt(index))}
      >
        <Image
          source={{ uri: item.img }}
          resizeMethod="resize"
          resizeMode="cover"
          style={[
            Styles.imageView,
            {
              borderWidth: parseInt(index) === currentChild ? vw(5) : 0,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <ChildrenFlatlist item={item} index={index} currentChild={currentChild} />
    );
  };

  return (
    <View style={Styles.mainView}>
      <View style={Styles.contactView}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <View style={{ paddingHorizontal: vw(20) }} />
          )}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderChild}
        />
        <View style={Styles.childView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={DATA}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
          />
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
  imageView: {
    height: vh(80),
    width: vh(80),
    borderRadius: vh(40),
    borderColor: Colors.violet,
  },
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
  {
    img: img,
    name: "Alex Parish",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: [{ disease: "Asthama" }, { disease: "Skin Rashes" }],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img: img,
    name: "Alex",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: [{ disease: "Asthama" }, { disease: "Skin Rashes" }],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img: img,
    name: "Parish",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: [{ disease: "Asthama" }, { disease: "Skin Rashes" }],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img: img,
    name: "Sam",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: [{ disease: "Asthama" }, { disease: "Skin Rashes" }],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img: img,
    name: "Raj",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: [{ disease: "Asthama" }, { disease: "Skin Rashes" }],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
];
