import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

import bgImage from "../images/background.jpg";
import logo from "../images/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";

const LoginScreen = (props) => {
  const { navigate } = props.navigation;

  const [securePass, setSecurePass] = useState(true);
  const [iconName, setIconName] = useState("ios-eye");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  iconPress = () => {
    setSecurePass(!securePass);
    let iconName = securePass ? "ios-eye-off" : "ios-eye";
    setIconName(iconName);
  };

  onLoginPress = () => {
    setLoading(true);
    setError("");
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() =>{
      setLoading(false);
      navigate("HomeScreen");
    })
    .catch(()=>{
      setError("Authentication Failed");
      setLoading(false); 
    })
  };

  renderLoading = () =>{
    if(loading){
      return <Text> Loading... </Text>
    }
  };

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
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name={"ios-lock"} size={28} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={securePass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        />
        <TouchableOpacity style={styles.btnEye} onPress={iconPress}>
          <Icon name={iconName} size={26} />
        </TouchableOpacity>
  
      </View>
      <Text>{error}</Text>

      <TouchableOpacity
        style={styles.btnLogin}
        onPress={onLoginPress}
      >
        <Text style={styles.loginText}>Logiiin</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpBtn} onPress={() => navigate("ForgotPassword")}>
          Forgot Password
        </Text>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>New? </Text>
        <Text style={styles.signUpBtn} onPress={() => navigate("Signup")}>
          Create Account
        </Text>
      </View>
    </ImageBackground>
  );
};

LoginScreen.navigationOptions = ({ navigate }) => ({ title: "Login" });

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
    marginBottom: 80
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
    marginTop: 50,
    alignItems: "center"
  },
  signUpText: {
    fontSize: 16
  },
  signUpBtn: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline"
  }
});

export default LoginScreen;