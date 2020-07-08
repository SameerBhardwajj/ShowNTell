import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { vw, vh, Colors } from "../../utils";
import { updateChild } from "../../modules/Home/action";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { currentChild } = useSelector((state: { Home: any }) => ({
    currentChild: state.Home.currentChild,
  }));
  return (
    <View style={Styles.mainView}>
      <TouchableOpacity
        style={{ width: "100%", flex: 1 }}
        activeOpacity={0.8}
        onPress={() => props.navigation.pop()}
      />
      <View style={Styles.modalView}>
        {props.route.params.child.length > 1 ? (
          <TouchableOpacity
            style={Styles.btnView}
            activeOpacity={0.8}
            onPress={() => {
              dispatch(
                updateChild({ child: 0, name: "All", classroom: 0 }, () => {})
              ),
                props.navigation.pop();
            }}
          >
            <Text
              style={[
                Styles.nameText,
                {
                  color: currentChild.child === 0 ? Colors.violet : "black",
                },
              ]}
            >
              All
            </Text>
            <View style={Styles.separatorView} />
          </TouchableOpacity>
        ) : null}
        {props.route.params.child.map((item: any) => (
          <View style={Styles.btnView}>
            <TouchableOpacity
              style={Styles.btnView}
              activeOpacity={0.8}
              onPress={() => {
                dispatch(
                  updateChild(
                    {
                      child: item.id,
                      name: `${item.first_name}`,
                      classroom: item.classroom_id,
                    },
                    () => {}
                  )
                ),
                  props.navigation.pop();
              }}
            >
              <Text
                style={[
                  Styles.nameText,
                  {
                    color:
                      currentChild.child === item.id ? Colors.violet : "black",
                  },
                ]}
              >{`${item.first_name} ${item.last_name}`}</Text>
            </TouchableOpacity>
            <View style={Styles.separatorView} />
          </View>
        ))}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopLeftRadius: vw(20),
    borderTopRightRadius: vw(20),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    textAlign: "center",
    paddingVertical: vh(40),
  },
  separatorView: {
    height: vw(1),
    width: "90%",
    backgroundColor: Colors.separator,
  },
  btnView: {
    width: "100%",
    alignItems: "center",
  },
});
