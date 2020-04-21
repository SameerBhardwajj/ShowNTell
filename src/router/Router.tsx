import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
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
import CreatePasswordModal from "../modules/Auth/Modal/CreatePasswordModal";
import ResetPasswordEmail from "../modules/Auth/ForgotPassowrd/ResetPasswordEmail";
import PasswordResetCode from "../modules/Auth/ForgotPassowrd/PasswordResetCode";
import ResetPassword from "../modules/Auth/ForgotPassowrd/ResetPassword";
import NearbySchool from "../modules/Auth/FindSchool/NearbySchool/NearbySchool";
import SchoolListing from "../modules/Auth/FindSchool/SchoolListing";

// Stack Registration
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();
const ModalStack = createStackNavigator();

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
    <AuthStack.Screen
      name="ResetPasswordEmail"
      component={ResetPasswordEmail}
    />
    <AuthStack.Screen name="PasswordResetCode" component={PasswordResetCode} />
    <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    <AuthStack.Screen name="NearbySchool" component={NearbySchool} />
    <AuthStack.Screen name="SchoolListing" component={SchoolListing} />
  </AuthStack.Navigator>
);

const DrawerNavigator = () => (
  <DrawerStack.Navigator initialRouteName="Home">
    <DrawerStack.Screen name="Home" component={Home} />
    <DrawerStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="Chat" component={Chat} />
  </DrawerStack.Navigator>
);

const ModalNavigator = () => (
  <ModalStack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: "transparent" },
    }}
    mode="modal"
    headerMode="none"
  >
    <ModalStack.Screen name="Modal" component={Modal} />
    <ModalStack.Screen name="ResendCodeModal" component={ResendCodeModal} />
    <ModalStack.Screen
      name="CreatePasswordModal"
      component={CreatePasswordModal}
    />
  </ModalStack.Navigator>
);

export interface AppProps {
  tab: boolean;
  splash: boolean;
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

  modal = {
    title: "",
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS,
    cardStyle: {
      backgroundColor: "rgba(0,0,0,0.2)",
      opacity: 1,
    },
  };

  screen = {
    ...TransitionPresets.DefaultTransition,
  };

  public render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none" initialRouteName="Splash">
          {this.props.splash ? (
            <RootStack.Screen
              name="Splash"
              component={Splash}
              options={this.screen}
            />
          ) : (
            <>
              <RootStack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                options={this.screen}
              />
              <RootStack.Screen
                name="Modal"
                component={Modal}
                options={this.modal}
              />
              <RootStack.Screen
                name="ResendCodeModal"
                component={ResendCodeModal}
                options={this.modal}
              />
              <RootStack.Screen
                name="CreatePasswordModal"
                component={CreatePasswordModal}
                options={this.modal}
              />
              <RootStack.Screen
                name="TabNavigator"
                component={this.TabNavigator}
                options={this.screen}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
