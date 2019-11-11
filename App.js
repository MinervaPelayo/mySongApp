import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as firebase from "firebase";

import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const AppNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  ForgotPassword: {screen: ForgotPasswordScreen},
  Home: { screen: HomeScreen }
});

const AppContainer = createAppContainer(AppNavigator);

const firebaseConfig = {
  apiKey: "AIzaSyAiydXxa-voPd8wf6fB3WpNVEeaPY87W9w",
  authDomain: "mysongapplication.firebaseapp.com",
  databaseURL: "https://mysongapplication.firebaseio.com",
  projectId: "mysongapplication",
  storageBucket: "mysongapplication.appspot.com",
  messagingSenderId: "654594072883",
  appId: "1:654594072883:web:15117948ed4b64f23f5e46"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return <AppContainer />;
}
