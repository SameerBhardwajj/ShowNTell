import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import Splash from "../modules/Splash/Splash";
import LandingPage from "../modules/Auth/LandingPage/LandingPage";
import Login from "../modules/Auth/Login/Login";
import FindSchool from "../modules/Auth/FindSchool/FindSchool";
import Home from "../modules/Home/Home";
import Profile from "../modules/Profile/Profile";
import Chat from "../modules/Chat/Chat";
import Attendance from "../modules/Attendance/Attendance";
import PhotoGallery from "../modules/PhotoGallery/PhotoGallery";
import Absence from "../modules/Absence/Absence";
import Modal from "../modules/Auth/Modal/Modal";
import Register from "../modules/Auth/Register/Register";
import AccessCodeVerification from "../modules/Auth/Register/AccessCodeVerification";
import CreatePassword from "../modules/Auth/Register/CreatePassword";
import RequestNewCode from "../modules/Auth/Register/RequestNewCode";
import ResendCodeModal from "../modules/Auth/Modal/ResendCodeModal";

// Stack Registration
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="LandingPage">
    <AuthStack.Screen name="LandingPage" component={LandingPage} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="FindSchool" component={FindSchool} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen
      name="AccessCodeVerification"
      component={AccessCodeVerification}
    />
    <AuthStack.Screen name="CreatePassword" component={CreatePassword} />
    <AuthStack.Screen name="RequestNewCode" component={RequestNewCode} />
  </AuthStack.Navigator>
);

const DrawerNavigator = () => (
  <DrawerStack.Navigator initialRouteName="Home">
    <DrawerStack.Screen name="Home" component={Home} />
    <DrawerStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="Chat" component={Chat} />
  </DrawerStack.Navigator>
);

export interface AppProps {
  tab: boolean;
}
export default class AppComponent extends React.PureComponent<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
  }

  TabNavigator = () => (
    <TabStack.Navigator headerMode="none" initialRouteName="Home">
      <TabStack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ tabBarVisible: this.props.tab }}
      />
      <TabStack.Screen name="Attendance" component={Attendance} />
      <TabStack.Screen name="PhotoGallery" component={PhotoGallery} />
      <TabStack.Screen name="Absence" component={Absence} />
    </TabStack.Navigator>
  );

  public render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          headerMode="none"
          initialRouteName="Splash"
          screenOptions={{
            cardStyle: { backgroundColor: "transparent" },
          }}
          mode="modal"
        >
          <RootStack.Screen name="Splash" component={Splash} />
          <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
          <RootStack.Screen name="Modal" component={Modal} />
          <RootStack.Screen
            name="ResendCodeModal"
            component={ResendCodeModal}
          />
          <RootStack.Screen name="TabNavigator" component={this.TabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
