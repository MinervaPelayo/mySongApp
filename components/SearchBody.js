import React from "React";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";

const SearchBody = props => {
  let currentuser;

  //Add selected lyrics to firebase
  iconPress = () => {
    //Get current user id and add data to firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        currentuser = user.uid;
        firebase
          .database()
          .ref(currentuser)
          .child("favorites")
          .push({
            artist: props.artistItems.artist,
            song: props.artistItems.song,
            lyrics: props.lyrics
          });
        Alert.alert("Added to favorites");
      } else {
        Alert.alert("Could not add favorite");
      }
    });
  };

  return (
    <View>
      <ScrollView>
        {props.isHidden ? null : (
          <Icon
            name="ios-heart"
            size={40}
            style={styles.inputIcon}
            onPress={iconPress}
          ></Icon>
        )}
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.lyricsText}>{props.lyrics}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    position: "absolute",
    top: 22,
    left: 310
  },
  titleText: {
    marginLeft: 30,
    marginBottom: 15,
    fontSize: 22
  },
  lyricsText: {
    marginLeft: 13,
    marginRight: 10
  }
});

export default SearchBody;
