import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
} from "react-native";

// custom imports
import { CustomHeader, CustomButton } from "../../../Components";
import { Strings, Images, vh, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.warn("You can use the location");
        // alert("You can use the location");
      } else {
        console.warn("location permission denied");
        // alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
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
