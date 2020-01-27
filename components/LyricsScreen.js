import React from "React";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const LyricsScreen = props => {
  const { params } = props.navigation.state;

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.songText}>"{params.data.song}"</Text>
        <Text style={styles.artistText}>by</Text>
        <Text style={styles.artistText}>{params.data.artist}</Text>
      </View>
      <View style={styles.lyricsContainer}>
        <Text style={styles.lyricsText}>{params.data.lyrics}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  songText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  artistText: {
    fontSize: 20
  },
  lyricsConatiner: {
    paddingBottom: 30
  },
  lyricsText: {
    marginLeft: 13,
    marginRight: 10,
    marginBottom: 30
  }
});

export default LyricsScreen;
