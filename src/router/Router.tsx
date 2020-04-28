import * as React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { vh, Colors, Images, vw } from "../utils";
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
import ScheduleTour from "../modules/Auth/FindSchool/ScheduleTour";
import DateTimeSchedule from "../modules/Auth/FindSchool/DateTimeSchedule";
import NeedHelp from "../modules/NeedHelp/NeedHelp";
import CustomDrawer from "./CustomDrawer";
import Announcement from "../modules/Announcement/Announcement";
import Settings from "../modules/Settings/Settings";
import AbsenceNotificationModal from "../modules/Attendance/AbsenceNotificationModal";
import QOD from "../modules/QOD/QOD";

// Stack Registration
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const ProfileStack = createStackNavigator();
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
    <AuthStack.Screen name="ScheduleTour" component={ScheduleTour} />
    <AuthStack.Screen name="DateTimeSchedule" component={DateTimeSchedule} />
    <AuthStack.Screen name="NeedHelp" component={NeedHelp} />
  </AuthStack.Navigator>
);

const DrawerNavigator = () => (
  <DrawerStack.Navigator
    drawerStyle={{ width: "85%" }}
    drawerContent={(props: any) => <CustomDrawer {...props} />}
  >
    <DrawerStack.Screen name="Home" component={Home} />
    <RootStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="Chat" component={Chat} />
    <DrawerStack.Screen name="Announcement" component={Announcement} />
    <DrawerStack.Screen name="Settings" component={Settings} />
    <DrawerStack.Screen name="QOD" component={QOD} />
  </DrawerStack.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
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
    <TabStack.Navigator
      headerMode="none"
      initialRouteName="Home"
      tabBarOptions={{
        style: Styles.tabView,
        safeAreaInsets: { bottom: 0 },
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          if (route.name === "Home") {
            return (
              <Text
                style={{
                  color: focused ? Colors.violet : Colors.characterGrey,
                  fontFamily: "Nunito-SemiBold",
                  fontSize: vh(12),
                  marginBottom: vh(10),
                }}
              >
                Home
              </Text>
            );
          } else if (route.name === "Attendance") {
            return (
              <Text
                style={{
                  color: focused ? Colors.violet : Colors.characterGrey,
                  fontFamily: "Nunito-SemiBold",
                  fontSize: vh(12),
                  marginBottom: vh(10),
                }}
              >
                Attendance
              </Text>
            );
          } else if (route.name === "PhotoGallery") {
            return (
              <Text
                style={{
                  color: focused ? Colors.violet : Colors.characterGrey,
                  fontFamily: "Nunito-SemiBold",
                  fontSize: vh(12),
                  marginBottom: vh(10),
                }}
              >
                Photo Library
              </Text>
            );
          } else if (route.name === "Absence") {
            return (
              <Text
                style={{
                  color: focused ? Colors.violet : Colors.characterGrey,
                  fontFamily: "Nunito-SemiBold",
                  fontSize: vh(12),
                  marginBottom: vh(10),
                }}
              >
                Absence
              </Text>
            );
          }
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.violet : Colors.characterGrey,
                  height: vw(30),
                  width: vw(30),
                }}
                source={Images.Home_Active}
              />
            );
          } else if (route.name === "Attendance") {
            return (
              <Image
                style={{
                  height: vw(30),
                  width: vw(30),
                }}
                source={
                  focused
                    ? Images.Attendance_Active
                    : Images.attendance_Inactive
                }
              />
            );
          } else if (route.name === "PhotoGallery") {
            return (
              <Image
                style={{
                  tintColor: focused ? Colors.violet : Colors.characterGrey,
                  height: vw(28),
                  width: vw(35),
                }}
                source={Images.Photo_Library}
              />
            );
          } else if (route.name === "Absence") {
            return (
              <Image
                style={{ height: vw(30), width: vw(30) }}
                source={
                  focused ? Images.Absence_Active : Images.Absence_Inactive
                }
              />
            );
          }
        },
      })}
    >
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
              <RootStack.Screen
                name="AbsenceNotificationModal"
                component={AbsenceNotificationModal}
                options={this.modal}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

const Styles = StyleSheet.create({
  tabView: {
    height: vh(70),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
    borderTopLeftRadius: vh(20),
    borderTopRightRadius: vh(20),
  },
});
