import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// Custom imports
import { Strings, vh, vw, Colors, Images, ScreenName } from "../../utils";
import { CustomHeader } from "../../Components";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        onPressBack={() => props.navigation.pop()}
        title={Strings.Settings}
      />
      <TouchableOpacity
        style={Styles.mainView2}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <Image source={Images.About_icon} style={Styles.imgView} />
        <Text style={Styles.label}>{Strings.About}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.mainView2}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <Image source={Images.TNC_Icon} style={Styles.imgView} />
        <Text style={Styles.label}>{Strings.Terms_of_Service}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.mainView2}
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.CHANGE_PASSWORD)}
      >
        <Image source={Images.Change_Password} style={Styles.imgView} />
        <Text style={Styles.label}>{Strings.Change_Password}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  mainView2: {
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: vw(16),
    paddingVertical: vh(23),
    flexDirection: "row",
    borderBottomWidth: vw(1),
    borderColor: Colors.borderGrey,
  },
  label: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    color: Colors.lightBlack,
    letterSpacing: -0.36,
  },
  imgView: {
    marginRight: vw(12),
    height: vh(32),
    width: vh(32),
  },
});
