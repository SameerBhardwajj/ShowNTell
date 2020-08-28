import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { vh, Images } from "../../utils";

export interface AppProps {
  name: string;
  value: boolean;
  onPress: Function;
  allCase: boolean;
  allNotification: boolean;
}

export default function App(props: AppProps) {
  const [isEnable, setIsEnable] = React.useState(props.value);

  return (
    <TouchableOpacity
      activeOpacity={props.allCase ? 1 : 0.8}
      style={Styles.mainView}
      onPress={() => {
        props.allCase || props.allNotification
          ? null
          : (setIsEnable(!isEnable), props.onPress(!isEnable));
      }}
    >
      <Text style={Styles.headingText}>{props.name}</Text>
      <Image
        source={
          isEnable && !props.allCase && !props.allNotification
            ? Images.Toggle_on
            : Images.Toggle_off
        }
      />
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
    paddingVertical: vh(14),
  },
});
