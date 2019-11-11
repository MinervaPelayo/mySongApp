import React from "React";
import { View, Text, StyleSheet } from "react-native";

const ForgotPasswordScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is password Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ForgotPasswordScreen;
