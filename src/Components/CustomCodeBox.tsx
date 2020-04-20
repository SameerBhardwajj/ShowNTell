import * as React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { vh, Colors, vw } from "../utils";

export interface AppProps {
  value: string;
  onChangeText: Function;
  onSubmitEditing: Function;
  returnKeyType?: any;
  autoFocus?: boolean;
  onKeyPress: Function;
  optional?: boolean;
}

const CustomCodeBox = React.forwardRef((props: AppProps, ref: any) => {
  let boxEmpty =
    props.value === undefined ||
    props.value === null ||
    props.value.length === 0;
  return (
    <View>
      <TextInput
        ref={ref}
        value={props.value}
        onChangeText={(text: string) => props.onChangeText(text)}
        keyboardType="number-pad"
        style={[
          Styles.mainView,
          {
            borderColor: props.optional
              ? Colors.violet
              : boxEmpty
              ? Colors.borderGrey
              : Colors.violet,
            backgroundColor: props.optional
              ? "white"
              : boxEmpty
              ? Colors.veryLightGrey
              : "white",
          },
        ]}
        maxLength={1}
        returnKeyType={props.returnKeyType}
        autoFocus={props.autoFocus}
        onKeyPress={(e: any) => props.onKeyPress(e)}
        onSubmitEditing={() => props.onSubmitEditing()}
      />
    </View>
  );
});

const Styles = StyleSheet.create({
  mainView: {
    height: vw(85),
    width: vw(85),
    borderWidth: vw(1),
    borderRadius: vw(8),
    fontFamily: "Nunito-SemiBold",
    fontSize: vw(32),
    textAlign: "center",
  },
});
export default CustomCodeBox;
