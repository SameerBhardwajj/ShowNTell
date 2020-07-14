import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// custom imports
import { vw, Strings, vh, Colors } from "../../utils";

export interface AppProps {
  closeModal: Function;
  updateProfile: Function;
  deleteProfile: Function;
}

export default function App(props: AppProps) {
  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.shareView}
          onPress={() => {
            props.updateProfile();
          }}
        >
          <Text style={Styles.bubbleMsgText}>{Strings.Update}</Text>
        </TouchableOpacity>
        <View style={Styles.separatorView} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.shareView}
          onPress={() => {
            props.deleteProfile();
            props.closeModal();
          }}
        >
          <Text style={Styles.bubbleMsgText}>{"Remove"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.cancelView}
        onPress={() => props.closeModal()}
      >
        <Text style={Styles.cancelText}>{Strings.Cancel}</Text>
      </TouchableOpacity>
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
    width: "95%",
    alignItems: "center",
    borderRadius: vw(20),
    paddingHorizontal: vw(18),
  },
  shareView: {
    width: "100%",
    paddingVertical: vh(25),
  },
  bubbleMsgText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    textAlign: "center",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
  },
  cancelView: {
    width: "95%",
    paddingVertical: vh(13),
    backgroundColor: "white",
    marginTop: vh(10),
    borderRadius: vh(30),
    marginBottom: vh(30),
  },
  cancelText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    textAlign: "center",
    color: Colors.lightBlack,
  },
});
