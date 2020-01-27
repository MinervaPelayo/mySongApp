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

import bgImage from "../images/background.jpg";
import logo from "../images/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";

const ForgotPasswordScreen = props => {
  const { navigate } = props.navigation;
  const [email, setEmail] = useState("");

  //Using firebase authentication, send and email to the user to reset the password 
  const onResetPress = () => {
      firebase.auth().sendPasswordResetEmail(email)
        .then(()=>{
            Alert.alert("Password reset email has been sent.")
        },(error)=>{
           Alert.alert(error.message);  
        });
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
          onChangeText={email => setEmail(email)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={onResetPress}>
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Know your password? </Text>
        <Text style={styles.signUpBtn} onPress={() => navigate("Login")}>
          Log In
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
    width: 140,
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

export default ForgotPasswordScreen;
