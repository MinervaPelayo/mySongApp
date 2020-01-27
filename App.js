import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import GlossaryScreen from "./components/GlossaryScreen";
import ForYouScreen from "./components/ForYouScreen";
import LyricsScreen from "./components/LyricsScreen";

const TabNavigator = createBottomTabNavigator(
  {
    Favorites: { screen: HomeScreen },
    Glossary: { screen: GlossaryScreen },
    Search: { screen: ForYouScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Favorites") {
          return (
            <Ionicons name="md-heart" size={25} color={tintColor} style={{ marginTop: 5 }} />
          );
        } else if (routeName === "Glossary") {
          return (
            <Ionicons name="md-bookmarks" size={25} color={tintColor} style={{ marginTop: 5 }} />
          );
        } else if (routeName === "Search") {
          return (
            <Ionicons name="md-search" size={25} color={tintColor} style={{ marginTop: 5 }} />
          );
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "#000000"
    }
  }
);

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  Lyrics: { screen: LyricsScreen }
});

const AppContainer = createAppContainer(AppNavigator);

const firebaseConfig = {
  //Application firebase Configuration
  /*
  apiKey: "***************",
  authDomain: "**************",
  databaseURL: "***************",
  projectId: "***************",
  storageBucket: "******************",
  messagingSenderId: "*****************",
  appId: "*****************"
  */
};


firebase.initializeApp(firebaseConfig);

export default function App() {
  return <AppContainer />;
}
