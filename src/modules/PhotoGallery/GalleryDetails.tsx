import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { updateTab } from "../Home/Action";
import { CustomHeader } from "../../Components";
import { Strings, vw, vh, Images, Colors, validate } from "../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { item } = props.route.params;
  return (
    <View style={Styles.mainView}>
      <CustomHeader title="" onPressBack={() => props.navigation.pop()} />
      <View style={Styles.mainBtnView}>
        <TouchableOpacity style={Styles.btnView}>
          <Image source={Images.download_Icon} style={Styles.btn} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.btnView}>
          <Image
            source={Images.Delete_Icon}
            style={[Styles.btn, { width: vh(21) }]}
          />
        </TouchableOpacity>
      </View>
      <Text style={Styles.heading}>{item.heading}</Text>
      <Text style={Styles.category}>{item.category}</Text>
      <Image source={{ uri: item.img }} style={Styles.img} />
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
  },
  mainBtnView: {
    position: "absolute",
    flexDirection: "row",
    top: vh(30),
    right: vw(12),
  },
  btnView: {
    padding: vh(12),
  },
  btn: {
    height: vh(22),
    width: vh(22),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: Colors.lightBlack,
    paddingLeft: vh(16),
    paddingTop: vh(16),
  },
  category: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(18),
    color: Colors.lightGrey,
    paddingTop: vh(10),
    paddingLeft: vh(16),
  },
  img: {
    height: "40%",
    width: "100%",
    marginTop: vh(80),
  },
});
