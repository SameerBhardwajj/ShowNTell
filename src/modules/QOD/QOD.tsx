import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

// custom imports
import { updateTab } from "../Home/action";
import { useDispatch, useSelector } from "react-redux";
import { vh, Colors, Images, vw, Strings, ScreenName } from "../../utils";
import { CustomHeader } from "../../Components";
import QODFlatList from "./QODFlatList";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [reRender, setReRender] = useState(false);
  const dispatch = useDispatch();
  const { tab } = useSelector((state: { Home: any }) => ({
    tab: state.Home.tab,
  }));

  useEffect(() => {}, []);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <QODFlatList item={item} index={index} />;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.QOD_label}
        onPressBack={() => props.navigation.navigate(ScreenName.HOME)}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(50) }}
      />
      <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
        <Text style={Styles.childHeaderText}>Alex </Text>
        <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
      </TouchableOpacity>
      <View style={Styles.mainInnerView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.filter}
        onPress={() => props.navigation.navigate(ScreenName.FILTER_MODAL)}
      >
        <Image source={Images.Elipsis_Options} />
      </TouchableOpacity>
    </View>
  );
}
export const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    right: vw(16),
    top: iPhoneX ? vh(43) : vh(33),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
  },
  dropdown: {
    height: vh(6),
    width: vh(11),
    marginLeft: vw(5),
    marginTop: 0,
    tintColor: Colors.violet,
  },
  mainInnerView: {
    paddingVertical: vh(8),
    paddingHorizontal: vw(16),
    marginBottom: vh(85),
    width: "100%",
  },
  cardView: {
    marginVertical: vh(8),
    padding: vh(16),
    borderRadius: vh(10),
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
    marginBottom: vh(10),
  },
  centerNameView: {
    alignItems: "flex-start",
    width: "75%",
    paddingHorizontal: vw(15),
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  time: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingVertical: vh(5),
  },
  btnQOD: {
    width: "100%",
    alignSelf: "center",
    marginTop: vh(20),
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  questionText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingVertical: vh(10),
  },
  timeBlack: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    padding: vh(5),
    paddingLeft: 0,
  },
  filter: {
    position: "absolute",
    right: vw(24),
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

const DATA: Array<any> = [
  {
    name: "Alex Parish",
    class: "Infant A",
    question: "Ask Alex, what did he learn about Earth today ?",
    dateTime: "Feb 1, 2020 at 12:00 PM",
    category: Strings.QOD_category,
  },
  {
    name: "Alex Parish",
    class: "Infant A",
    question: "Ask Alex, what did he learn about Earth today ?",
    dateTime: "Feb 1, 2020 at 12:00 PM",
    category: Strings.QOD_category,
  },
  {
    name: "Alex Parish",
    class: "Infant A",
    question: "Ask Alex, what did he learn about Earth today ?",
    dateTime: "Feb 1, 2020 at 12:00 PM",
    category: Strings.QOD_category,
  },
];
