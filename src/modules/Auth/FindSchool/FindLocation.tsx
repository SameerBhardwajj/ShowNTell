import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";

// custom imports
import { CustomHeader, CustomButton } from "../../../Components";
import { Strings, Images, vh, Colors, ScreenName } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const requestLocationPermission = async () => {
    let hasPermission = true;
    if (Platform.OS === "android") {
      hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!hasPermission) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    if (!hasPermission) {
      Linking.openSettings();
    }
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (info) => {
          let position = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          };
          console.warn("coordinates ", position);
          props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
            coordinates: { latitude: 41.063412, longitude: -74.133544 },
          });
        },
        (error) => {
          console.warn("error ", error.code);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      );
    }
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
        onPress={() => props.navigation.navigate(ScreenName.NEARBY_SCHOOL)}
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