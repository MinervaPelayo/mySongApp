import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import bgImage from "../images/background.jpg";
import logo from "../images/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";

const LoginScreen = props => {
  const { navigate } = props.navigation;
  const [securePass, setSecurePass] = useState(true);
  const [iconName, setIconName] = useState("ios-eye-off");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Switch left icon from password input box and change password vissibility
  iconPress = () => {
    setSecurePass(!securePass);
    let iconName = securePass ? "ios-eye" : "ios-eye-off";
    setIconName(iconName);
  };

  //Authenticate email && password with firebase then navigate to main application screen
  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        () => {
          const navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNavigator" })]
          });
          props.navigation.dispatch(navActions);
        },
        error => {
          Alert.alert("Log In Error");
        }
      );
  };

  //Sign in to application with Expo Google
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "654594072883-68rl5n0hlhcta1hv5tl9uad49o8loo40.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        onSignIn(result);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  //Exchange the ID token from the Google's auth response 
  //for a Firebase credential and sign-in Firebase
  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
          );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(()=>{
          const navActions = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "TabNavigator" })]
          });
          props.navigation.dispatch(navActions);
        })
        .catch(function(error) {
          console.log(error);
        });
      } else {
        const navActions = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "TabNavigator" })]
        });
        props.navigation.dispatch(navActions);
        console.log('User already signed-in Firebase.');
      }
    });
  }

  //Check that the Google user is not already signed-in Firebase
  //To avoid un-needed re-auth
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.idToken) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoText}>MYSONG</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name={"ios-mail"} size={28} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          onChangeText={email => setEmail(email)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name={"ios-lock"} size={28} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={securePass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          onChangeText={password => setPassword(password)}
          value={password}
        />
        <TouchableOpacity style={styles.btnEye} onPress={iconPress}>
          <Icon name={iconName} size={26} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={onLoginPress}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>New? </Text>
        <Text style={styles.signUpBtn} onPress={() => navigate("Signup")}>
          Create Account
        </Text>
      </View>
      <View style={styles.forgotPassContainer}>
        <Text style={styles.signUpText}>or</Text>
        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={signInWithGoogleAsync}
        >
          <Text style={styles.loginText}>Sign in with Google</Text>
        </TouchableOpacity>
        <Text
          style={styles.forgotPassBtn}
          onPress={() => navigate("ForgotPassword")}
        >
          Forgot Password
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center"
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 130
  },
  logo: {
    width: 40,
    height: 50
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    opacity: 0.9
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: 250,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    color: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 25
  },
  inputIcon: {
    position: "absolute",
    top: 7,
    left: 40
  },
  btnEye: {
    position: "absolute",
    top: 9,
    right: 37
  },
  btnLogin: {
    width: 120,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20
  },
  loginText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 90,
    alignItems: "center"
  },
  signUpText: {
    fontSize: 16,
    marginBottom: 10
  },
  signUpBtn: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  forgotPassContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  btnGoogle: {
    width: 180,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#DB4437",
    justifyContent: "center"
  },
  forgotPassBtn: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 80
  }
});

export default LoginScreen;
