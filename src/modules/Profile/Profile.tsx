import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";

// custom imports
import { CustomHeader } from "../../Components";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../utils";
import TopTabNavigation from "./TopTabNavigation";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [profilePic, setProfilePic] = useState("");

  const ImagePick = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then((image: any) => {
      setProfilePic(image.path);
    });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={Styles.mainView}>
        <CustomHeader
          title={Strings.My_Profile}
          onPressBack={() => props.navigation.pop()}
        />
        <View style={Styles.profilePicView}>
          <View>
            <Image
              source={
                profilePic.length === 0 ? Images.any : { uri: profilePic }
              }
              style={Styles.profilePic}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.editView}
              onPress={() => ImagePick()}
            >
              <Image
                source={Images.Edit_Image}
                style={Styles.editImg}
                resizeMode="center"
              />
            </TouchableOpacity>
          </View>
          <Text style={Styles.nameText}>{Strings.Bob_Parish}</Text>
        </View>
        <View style={{ height: "100%", width: "100%" }}>
          <TopTabNavigation />
        </View>
      </View>
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  profilePicView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: Colors.violet,
    paddingVertical: vh(20),
  },
  profilePic: {
    height: vh(120),
    width: vh(120),
    borderRadius: vh(60),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    color: "white",
    fontSize: vh(22),
    paddingTop: vh(16),
  },
  editView: {
    position: "absolute",
    paddingLeft: vw(10),
    paddingTop: vw(10),
    right: 0,
    bottom: 0,
  },
  editImg: {
    height: vh(35),
    width: vh(35),
  },
});
