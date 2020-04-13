import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens
import Auth from '../modules/Auth/Auth';
import FindSchool from '../modules/FindSchool/FindSchool';
import Home from '../modules/Home/Home';
import Profile from '../modules/Profile/Profile';
import Chat from '../modules/Chat/Chat';
import Attendance from '../modules/Attendance/Attendance';
import PhotoGallery from '../modules/PhotoGallery/PhotoGallery';
import Absence from '../modules/Absence/Absence';

// Stack Registration
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();

export interface AppProps {
  tab: boolean;
}

let tabVisible = true;


const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Auth">
    <AuthStack.Screen name="Auth" component={Auth} />
    <AuthStack.Screen name="FindSchool" component={FindSchool} />
  </AuthStack.Navigator>
);

const TabNavigator = () => (
  <TabStack.Navigator headerMode="none" initialRouteName="Home">
    <TabStack.Screen
      name="Home"
      component={DrawerNavigator}
      options={{tabBarVisible: tabVisible}}
    />
    <TabStack.Screen
      name="Attendance"
      component={Attendance}
      options={{tabBarVisible: tabVisible}}
    />
    <TabStack.Screen
      name="PhotoGallery"
      component={PhotoGallery}
      options={{tabBarVisible: tabVisible}}
    />
    <TabStack.Screen
      name="Absence"
      component={Absence}
      options={{tabBarVisible: tabVisible}}
    />
  </TabStack.Navigator>
);

const DrawerNavigator = () => (
  <DrawerStack.Navigator initialRouteName="Home">
    <DrawerStack.Screen name="Home" component={Home} />
    <DrawerStack.Screen name="Profile" component={Profile} />
    <DrawerStack.Screen name="Chat" component={Chat} />
  </DrawerStack.Navigator>
);

export default class AppComponent extends React.PureComponent<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    tabVisible = this.props.tab;
    console.warn(tabVisible);
  }

  public render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none" initialRouteName="AuthNavigator">
          <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
