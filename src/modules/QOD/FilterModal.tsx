import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../utils";
import { CustomButton } from "../../Components";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [did, setDid] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.cancelBtn}
          onPress={() => props.navigation.pop()}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
        <Text style={Styles.headingText}>{Strings.Filter}</Text>
        <View style={Styles.separatorView} />
        <View style={Styles.optionView}>
          <Text style={Styles.optionText}>{Strings.I_did_it}</Text>
          <TouchableOpacity
            style={Styles.boxView}
            activeOpacity={0.8}
            onPress={() => setDid(!did)}
          >
            <Image
              source={did ? Images.Check_Box_Active : Images.Check_Box_inactive}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            Styles.optionView,
            { marginTop: vh(20), marginBottom: vh(20) },
          ]}
        >
          <Text style={Styles.optionText}>{Strings.Done}</Text>
          <TouchableOpacity
            style={Styles.boxView}
            activeOpacity={0.8}
            onPress={() => setDone(!done)}
          >
            <Image
              source={
                done ? Images.Check_Box_Active : Images.Check_Box_inactive
              }
            />
          </TouchableOpacity>
        </View>
        <CustomButton
          ButtonStyle={{ width: "100%" }}
          Text={Strings.proceed}
          onPress={() => props.navigation.navigate("")}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderRadius: vw(20),
    paddingVertical: vh(20),
    paddingHorizontal: vw(18),
  },
  cancelBtn: {
    position: "absolute",
    padding: vh(24),
    right: 0,
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
    marginVertical: vh(20),
  },
  optionView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  boxView: {
    height: vh(30),
    width: vh(30),
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
});
