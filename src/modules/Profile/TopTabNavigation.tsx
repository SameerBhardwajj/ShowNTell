import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";

// custom Imports
import BasicDetails from "./BasicDetails";
import MyChildren from "./MyChildren";
import { vw, vh, Colors, ScreenName } from "../../utils";

// Stack
const TopTabStack = createMaterialTopTabNavigator();

export interface AppProps {}

export default function App(props: AppProps) {
  const modal = {
    title: "",
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS,
    cardStyle: {
      backgroundColor: "rgba(0,0,0,0.2)",
      opacity: 1,
    },
  };

  const screen = {
    ...TransitionPresets.DefaultTransition,
  };
  return (
    <NavigationContainer independent={true}>
      <TopTabStack.Navigator
        initialRouteName={ScreenName.BASIC_DETAILS}
        lazy={true}
        tabBarOptions={{
          indicatorStyle: {
            height: vw(5),
            backgroundColor: "white",
            borderRadius: vw(5),
            position: "absolute",
            top: 0,
          },
          style: {
            backgroundColor: Colors.violet,
            borderBottomEndRadius: vw(15),
            borderBottomStartRadius: vw(15),
          },
          activeTintColor: "white",
          inactiveTintColor: Colors.lightViolet,
          labelStyle: {
            fontFamily: "Nunito-Bold",
            fontSize: vh(16),
            textTransform: "capitalize",
          },
        }}
      >
        <TopTabStack.Screen
          name={ScreenName.BASIC_DETAILS}
          component={BasicDetails}
        />
        <TopTabStack.Screen
          name={ScreenName.MY_CHILDREN}
          component={MyChildren}
        />
      </TopTabStack.Navigator>
    </NavigationContainer>
  );
}
