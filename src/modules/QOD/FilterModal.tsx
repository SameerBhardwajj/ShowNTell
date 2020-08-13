import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../utils";
import { CustomButton } from "../../Components";

export interface AppProps {
  onPress: Function;
  setModal: Function;
}

export default function App(props: AppProps) {
  const [myState, setMyState] = React.useState(true);
  const [did, setDid] = React.useState(true);
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.cancelBtn}
          onPress={() => props.setModal(false)}
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
            onPress={() => {
              setMyState(false), setDid(true);
            }}
          >
            <Image
              source={
                myState
                  ? Images.Check_Box_inactive
                  : did
                  ? Images.Check_Box_Active
                  : Images.Check_Box_inactive
              }
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
            onPress={() => {
              setMyState(false), setDid(false);
            }}
          >
            <Image
              source={
                myState
                  ? Images.Check_Box_inactive
                  : !did
                  ? Images.Check_Box_Active
                  : Images.Check_Box_inactive
              }
            />
          </TouchableOpacity>
        </View>
        <CustomButton
          activeOpacity={myState ? 1 : 0.8}
          ButtonStyle={{ width: "100%" }}
          Text={Strings.proceed}
          onPress={() => {
            myState ? null : props.onPress(did);
          }}
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
    borderTopRightRadius: vw(20),
    borderTopLeftRadius: vh(20),
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
