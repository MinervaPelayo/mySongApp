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

const SignupScreen = props => {
  const { navigate } = props.navigation;

  const [securePass, setSecurePass] = useState(true);
  const [iconName, setIconName] = useState("ios-eye");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  iconPress = () => {
    setSecurePass(!securePass);
    let iconName = securePass ? "ios-eye-off" : "ios-eye";
    setIconName(iconName);
  };

  onSignupPress = () => {
    setLoading(true);
    setError("");
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      firebase.auth().signInWithEmailAndPassword(email, password)
    })
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
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name={"ios-lock"} size={28} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={securePass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          onChangeText={(password)=>setPassword(password)}
          value={password}
        />
        
        <TouchableOpacity style={styles.btnEye} onPress={iconPress}>
          <Icon name={iconName} size={26} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name={"ios-lock"} size={28} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={"Confirm Password"}
          secureTextEntry={securePass}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
          onChangeText={(passwordConfirm)=>setPasswordConfirm(passwordConfirm)}
          value={passwordConfirm}
        />
        
        <TouchableOpacity style={styles.btnEye} onPress={iconPress}>
          <Icon name={iconName} size={26} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogin} onPress={(onSignupPress)}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
      
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <Text style={styles.signUpBtn} onPress={() => navigate("Login")}>Login</Text>
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

export default SignupScreen;
