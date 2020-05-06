import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { vw, vh, Strings, Images, Colors } from "../../utils";

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <View style={Styles.contactView}>
        <View style={Styles.commonView}>
          <Text style={Styles.headingText}>{Strings.Contact_Details}</Text>
          <TouchableOpacity activeOpacity={0.8} style={Styles.editView}>
            <Image source={Images.Edit_Image} />
          </TouchableOpacity>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Phone_Icon_blue} />
          <Text style={Styles.itemText}>+1 - 987654321</Text>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Mobile_Icon} />
          <Text style={Styles.itemText}>+1 - 987654321</Text>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Home_Icom} />
          <Text style={Styles.itemText}>+1 - 987654321</Text>
        </View>
      </View>
      <View style={Styles.contactView}>
        <View style={Styles.commonView}>
          <Text style={Styles.headingText}>{Strings.Address_Details}</Text>
          <TouchableOpacity activeOpacity={0.8} style={Styles.editView}>
            <Image source={Images.Edit_Image} />
          </TouchableOpacity>
        </View>
        <View style={[Styles.itemView, { alignItems: "flex-start" }]}>
          <Image source={Images.Location_Pin_Icon} />
          <Text style={Styles.itemText}>
            555 Main Street, Willington, FL-315
          </Text>
        </View>
      </View>
      <View style={Styles.contactView}>
        <View style={Styles.commonView}>
          <Text style={Styles.headingText}>{Strings.Email}</Text>
          <TouchableOpacity activeOpacity={0.8} style={Styles.editView}>
            <Image source={Images.Edit_Image} />
          </TouchableOpacity>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Mobile_Icon} />
          <Text style={Styles.itemText}>Bob.Parish@gmail.com</Text>
        </View>
      </View>
      <View style={Styles.contactView}>
        <View style={Styles.commonView}>
          <Text style={Styles.headingText}>{Strings.Activity_Preferences}</Text>
          <TouchableOpacity activeOpacity={0.8} style={Styles.editView}>
            <Image source={Images.Edit_Image} />
          </TouchableOpacity>
        </View>
        <View style={Styles.toggleView}>
          <Text style={[Styles.itemText, { paddingLeft: 0 }]}>
            {Strings.Receive_Daily_Emails}
          </Text>
          <Image source={Images.Toggle_on} />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  contactView: {
    backgroundColor: "white",
    padding: vh(16),
    paddingTop: vh(6),
    alignItems: "center",
    width: "100%",
    borderRadius: vh(8),
    marginBottom: vh(16),
  },
  commonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headingText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.mediumBlack,
  },
  editView: {
    padding: vh(10),
    paddingRight: 0,
  },
  itemView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: vh(10),
  },
  itemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    paddingLeft: vw(10),
  },
  toggleView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
});
