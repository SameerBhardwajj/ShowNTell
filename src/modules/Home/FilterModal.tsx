import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";

// custom imports
import { vh, Colors, Images, vw, Strings } from "../../utils";
import { CustomButton, CustomSearchBar } from "../../Components";

export interface AppProps {
  setModalOpen: Function;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.innerModalView}>
      <View style={Styles.headingView}>
        <Text style={Styles.childHeaderText}>{Strings.Home_Feed_Options}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.setModalOpen(false)}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
      </View>
      <View style={Styles.filterView}>
        <View style={Styles.leftFilter}>
          <TouchableOpacity style={Styles.categoryView}>
            <Text style={Styles.childHeaderText}>
              {Strings.Activity_Category}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.categoryView}>
            <Text style={Styles.childHeaderText}>{Strings.Date}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.categoryView}>
            <Text style={Styles.childHeaderText}>{Strings.Activity_Types}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.rightFilter}>
          <CustomSearchBar
            value=""
            placeholder={Strings.Search}
            onChangeText={() => {}}
            onPressCancel={() => {}}
            onSubmitEditing={() => Keyboard.dismiss()}
            mainViewStyle={{width: '68%'}}
          />
        </View>
      </View>
      <View style={Styles.bottomView}>
        <CustomButton
          lightBtn={true}
          onPress={() => {}}
          Text={Strings.Reset}
          ButtonStyle={Styles.applyBtn}
        />
        <CustomButton
          onPress={() => {}}
          Text={Strings.Apply}
          ButtonStyle={Styles.applyBtn}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  innerModalView: {
    backgroundColor: "white",
    borderTopLeftRadius: vh(20),
    borderTopRightRadius: vh(20),
    width: "100%",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: vh(20),
    borderBottomWidth: vw(1),
    borderColor: Colors.borderGrey,
  },
  filterView: {
    flexDirection: "row",
  },
  bottomView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: vh(20),
    borderTopWidth: vw(1),
    borderColor: Colors.borderGrey,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -5,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  leftFilter: {
    backgroundColor: Colors.lightPink,
    width: vw(120),
  },
  categoryView: {
    justifyContent: "center",
    paddingVertical: vh(24),
    paddingLeft: vw(20),
    borderBottomWidth: vw(2.5),
    borderColor: Colors.lightPink,
  },
  rightFilter: {
    padding: vh(16),
    width: '100%'
  },
  applyBtn: {
    width: "40%",
    marginVertical: vh(20),
  },
});
