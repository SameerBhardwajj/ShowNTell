import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import BasicDetails from "./BasicDetails";
import MyChildren from "./MyChildren";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../utils";

const TopTabStack = createMaterialTopTabNavigator();

export interface AppProps {}

export default function App(props: AppProps) {
  return (
    <NavigationContainer independent={true}>
      <TopTabStack.Navigator
        tabBarOptions={{
          tabStyle: { backgroundColor: Colors.violet },
          activeTintColor: "white",
          inactiveTintColor: Colors.lightViolet,
          backgroundColor: Colors.violet,
          indicatorStyle: { backgroundColor: "white", height: 3 },
          labelStyle: {
            fontFamily: "Nunito-Bold",
            fontSize: vh(16),
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
