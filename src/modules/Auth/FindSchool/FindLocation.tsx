import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from "react-native";

// custom imports
import { CustomHeader, CustomButton, CustomToast } from "../../../Components";
import {
  Strings,
  Images,
  vh,
  Colors,
  ScreenName,
  CommonFunctions,
} from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const requestLocationPermission = () => {
    setIsLoading(true);
    CommonFunctions.requestLocationPermission(
      (position: object) => {
        setIsLoading(false);
        props.navigation.navigate(ScreenName.SCHOOL_LISTING, {
          coordinates: { lat: 41.063412, lng: -74.133544 },
        });
      },
      (error: any) => {
        setIsLoading(false);
        error.code === 2
          ? CustomToast(Strings.Please_On_GPS)
          : error.code === 1
          ? Alert.alert(
              Strings.Permission_denied,
              "",
              [
                { text: "OK", onPress: () => Linking.openSettings() },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: true }
            )
          : CustomToast(error.message);
      },
      () => {
        setIsLoading(false);
        Linking.openSettings();
      }
    );
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
