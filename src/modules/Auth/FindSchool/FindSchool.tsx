import * as React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
// import { PERMISSIONS, request } from "react-native-permissions";
// import Geolocation from "@react-native-community/geolocation";

// custom imports
import { CustomHeader, CustomButton } from "../../../Components";
import { Strings, Images, vh, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const requestLocationPermission = async () => {
    // try {
    //   request(
    //     Platform.select({
    //       android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //       ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    //     })
    //   ).then((res: string) => {
    //     if (res == "granted") {
    //       Geolocation.getCurrentPosition((info) => {
    //         let position = {
    //           latitude: info.coords.latitude,
    //           longitude: info.coords.longitude,
    //         };
    //         console.warn("coordinates ", position);
    //       });
    //     } else {
    //       // console.log("Location is not enabled");
    //     }
    //   });
    // } catch (error) {
    //   console.log("location set error:", error);
    // }
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Nearby_School}
        onPressBack={() => props.navigation.pop()}
      />
      <Image source={Images.Location_Graphic} style={Styles.img} />
      <Text style={Styles.mainHeading}>{Strings.Allow_Location_Access}</Text>
      <Text style={Styles.titleHeading}>{Strings.to_locate_schools}</Text>
      <CustomButton
        Text={Strings.Allow_Location_Access}
        onPress={() => requestLocationPermission()}
      />
      <CustomButton
        Text={Strings.Select_Location_Manually}
        onPress={() => props.navigation.navigate("NearbySchool")}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  img: {
    height: vh(100),
    width: vh(112),
    marginTop: vh(90),
    marginBottom: vh(80),
  },
  mainHeading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
  },
  titleHeading: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(15),
    color: Colors.lightGrey,
    textAlign: "center",
    marginTop: vh(10),
    marginBottom: vh(28),
  },
});
