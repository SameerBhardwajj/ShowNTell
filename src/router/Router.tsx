import * as React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { vh, Colors, Images, vw, ScreenName } from "../utils";
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
import Events from "../modules/Events/Events";
import ClassroomSchedule from "../modules/ClassroomSchedule/ClassroomSchedule";
import Statements from "../modules/Statements/Statements";
import Referral from "../modules/Referral/Referral";
import Testimonials from "../modules/Testimonials/Testimonials";
import Attendance from "../modules/Attendance/Attendance";
import PhotoGallery from "../modules/PhotoLibrary/PhotoLibrary";
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
import FilterModal from "../modules/QOD/FilterModal";
import ShareModal from "../modules/Home/ShareModal";
import LogoutModal from "../modules/Auth/Modal/LogoutModal";
import ActivityModal from "../modules/Home/ActivityModal";
import GalleryDetails from "../modules/PhotoLibrary/GalleryDetails";
import CreateAbsence from "../modules/Absence/CreateAbsence";
import ChildModal from "../Components/CustomHeader/ChildModal";

// Stack Registration
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
    headerMode="none"
    initialRouteName={ScreenName.LANDING_PAGE}
  >
    <AuthStack.Screen name={ScreenName.LANDING_PAGE} component={LandingPage} />
    <AuthStack.Screen name={ScreenName.LOGIN} component={Login} />
    <AuthStack.Screen name={ScreenName.FIND_SCHOOL} component={FindSchool} />
    <AuthStack.Screen name={ScreenName.REGISTER} component={Register} />
    <AuthStack.Screen
      name={ScreenName.ACCESS_CODE_VERIFICATION}
      component={AccessCodeVerification}
    />
    <AuthStack.Screen
      name={ScreenName.CREATE_PASSWORD}
      component={CreatePassword}
    />
    <AuthStack.Screen
      name={ScreenName.REQUEST_NEW_CODE}
      component={RequestNewCode}
    />
    <AuthStack.Screen
      name={ScreenName.RESET_PASSWORD_EMAIL}
      component={ResetPasswordEmail}
    />
    <AuthStack.Screen
      name={ScreenName.PASSWORD_RESET_CODE}
      component={PasswordResetCode}
    />
    <AuthStack.Screen
      name={ScreenName.RESET_PASSWORD}
      component={ResetPassword}
    />
    <AuthStack.Screen
      name={ScreenName.NEARBY_SCHOOL}
      component={NearbySchool}
    />
    <AuthStack.Screen
      name={ScreenName.SCHOOL_LISTING}
      component={SchoolListing}
    />
    <AuthStack.Screen
      name={ScreenName.SCHEDULE_TOUR}
      component={ScheduleTour}
    />
    <AuthStack.Screen
      name={ScreenName.DATE_TIME_SCHEDULE}
      component={DateTimeSchedule}
    />
    <AuthStack.Screen name={ScreenName.NEED_HELP} component={NeedHelp} />
  </AuthStack.Navigator>
);

const DrawerNavigator = () => (
  <DrawerStack.Navigator
    drawerStyle={{ width: "85%" }}
    drawerContent={(props: any) => <CustomDrawer {...props} />}
  >
    <DrawerStack.Screen name={ScreenName.HOME} component={Home} />
    <DrawerStack.Screen
      name={ScreenName.PHOTO_LIBRARY}
      component={PhotoGallery}
    />
  </DrawerStack.Navigator>
);

console.disableYellowBox = false;

export interface AppProps {
  tab: boolean;
  splash: boolean;
  login: boolean;
}
export default class AppComponent extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    console.warn("navigation value ", props.tab);
  }

  TabNavigator = () => (
    <TabStack.Navigator
      headerMode="none"
      initialRouteName={ScreenName.HOME}
      tabBarOptions={{
        style: Styles.tabView,
        safeAreaInsets: { bottom: 0 },
        activeTintColor: Colors.violet,
        inactiveTintColor: Colors.characterGrey,
        labelStyle: {
          fontFamily: "Nunito-SemiBold",
          fontSize: vh(12),
          marginBottom: vh(10),
          textTransform: "capitalize",
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === ScreenName.HOME) {
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
          } else if (route.name === ScreenName.ATTENDANCE) {
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
          } else if (route.name === ScreenName.PHOTO_LIBRARY) {
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
          } else if (route.name === ScreenName.ABSENCE) {
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
        name={ScreenName.HOME}
        component={DrawerNavigator}
        options={{ tabBarVisible: this.props.tab }}
      />
      <TabStack.Screen name={ScreenName.ATTENDANCE} component={Attendance} />
      <TabStack.Screen
        name={ScreenName.PHOTO_LIBRARY}
        component={PhotoGallery}
      />
      <TabStack.Screen name={ScreenName.ABSENCE} component={Absence} />
    </TabStack.Navigator>
  );

  modal = {
    title: "",
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS,
    cardStyle: {
      backgroundColor: Colors.modalBg2,
      opacity: 1,
    },
  };

  screen = {
    ...TransitionPresets.DefaultTransition,
  };

  public render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          headerMode="none"
          initialRouteName={ScreenName.SPLASH}
        >
          {this.props.splash ? (
            <RootStack.Screen
              name={ScreenName.SPLASH}
              component={Splash}
              options={this.screen}
            />
          ) : this.props.login ? (
            <>
              <RootStack.Screen
                name={ScreenName.AUTH_NAVIGATOR}
                component={AuthNavigator}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.MODAL}
                component={Modal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.RESEND_CODE_MODAL}
                component={ResendCodeModal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.CREATE_PASSWORD_MODAL}
                component={CreatePasswordModal}
                options={this.modal}
              />
            </>
          ) : (
            <>
              <RootStack.Screen
                name={ScreenName.TAB_NAVIGATOR}
                component={this.TabNavigator}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.PROFILE}
                component={Profile}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.CHAT}
                component={Chat}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.ANNOUNCEMENT}
                component={Announcement}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.SETTINGS}
                component={Settings}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.QOD}
                component={QOD}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.EVENTS}
                component={Events}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.CLASSROOM_SCHEDULE}
                component={ClassroomSchedule}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.STATEMENTS}
                component={Statements}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.REFERRAL}
                component={Referral}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.TESTIMONIALS}
                component={Testimonials}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.SHARE_MODAL}
                component={ShareModal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.ACTIVITY_MODAL}
                component={ActivityModal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.ABSENCE_NOTIFICATION_MODAL}
                component={AbsenceNotificationModal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.GALLERY_DETAILS}
                component={GalleryDetails}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.FILTER_MODAL}
                component={FilterModal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.CREATE_ABSENCE}
                component={CreateAbsence}
                options={this.screen}
              />
              <RootStack.Screen
                name={ScreenName.CHILD_MODAL}
                component={ChildModal}
                options={this.modal}
              />
              <RootStack.Screen
                name={ScreenName.LOGOUT_MODAL}
                component={LogoutModal}
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
    alignItems: "center",
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
