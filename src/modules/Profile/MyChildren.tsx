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

export interface AppProps {}

export default function App(props: AppProps) {
  const [currentChild, setCurrentChild] = useState(0);

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
    img:
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    name: "Alex Parish",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: ["Asthama", "Skin Rashes", "Food Poisioning"],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img:
      "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Alex",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: ["Asthama", "Skin Rashes"],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfHtQL_rkve2SB0gLi7Ev37CWhwa2gEpmKwuuMsjgGG7zsx1lF&usqp=CAU",
    name: "Parish",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: ["Asthama", "Skin Rashes"],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRumf07Mflse2OBnmdZcrB_u30MamZw-KnJVVluhdFzkz9y_Zg4&usqp=CAU",
    name: "Sam",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: ["Asthama", "Skin Rashes"],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
  {
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgWrsvt5Ch52QWa-rO1d6rr14WXY8Wf5X_FBI4YYg5RX5FTrW7&usqp=CAU",
    name: "Raj",
    dob: "February 21, 2016",
    class: "Infant - A",
    disease: ["Asthama", "Skin Rashes"],
    teacherName: "Natasha Jacobs",
    teacherClass: "Infant A",
  },
];
