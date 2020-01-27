import React, { useState } from "React";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import * as axios from "axios";
import SearchBody from "./SearchBody";

const ForYouScreen = props => {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [artistItems, setArtistItems] = useState({});
  const [lyrics, setLyrics] = useState("");
  const [title, setTitle] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  //Verify that input field is not empty and call getArtist()
  const checkInput = () => {
    if (artist == "" || song == "") {
      Alert.alert("Fill both input fields");
    } else {
      getLyrics();
      setArtist("");
      setSong("");
    }
  };

  //Modify URL, fetch lyrics and save them to variable artistItems
  const getLyrics = () => {
    let url = "";

    //Save request headers into variable
    const RAPIDAPI_REQUEST_HEADERS = {
    // "X-RapidAPI-Host": "********",
    //"X-RapidAPI-Key": "**********",
      "Content-Type": "application/json"
    };

    //Check for whitespace and modify URL
    if (/\s/.test(artist) && /\s/.test(song)) {
      let fixartist = artist.replace(/\s/g, "%20");
      let fixsong = song.replace(/\s/g, "%20");
      url = "https://mourits-lyrics.p.rapidapi.com/?artist=" + fixartist + "&song=" + fixsong;
    } else if (/\s/.test(artist)) {
      let fixartist = artist.replace(/\s/g, "%20");
      url = "https://mourits-lyrics.p.rapidapi.com/?artist=" + fixartist + "&song=" + song;
    } else if (/\s/.test(song)) {
      let fixsong = song.replace(/\s/g, "%20");
      url = "https://mourits-lyrics.p.rapidapi.com/?artist=" + artist + "&song=" + fixsong;
    } else {
      url = "https://mourits-lyrics.p.rapidapi.com/?artist=" + artist + "&song=" + song;
    }

    //Fetch lyrics
    axios
      .get(`${url}`, { headers: RAPIDAPI_REQUEST_HEADERS })
      .then(response => {
        const data = response.data;
        setArtistItems(data);
        setLyrics(data.result.lyrics);
        setTitle('"' + data.song + '"' + " by " + data.artist);
        setIsHidden(false);
      })
      .catch(error => {
        Alert.alert("No lyrics found");
        setIsHidden(true);
        setTitle("");
        setLyrics("");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          label="Artist"
          value={artist}
          placeholder="Type artist name"
          placeholderTextColor={"rgba(255, 255, 255, 0.9)"}
          onChangeText={artist => setArtist(artist)}
        />
        <TextInput
          style={styles.inputStyle}
          label="Song"
          value={song}
          placeholder="Type song name"
          placeholderTextColor={"rgba(255, 255, 255, 0.9)"}
          onChangeText={song => setSong(song)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnFind} onPress={checkInput}>
          <Text style={styles.findText}>FIND LYRICS</Text>
        </TouchableOpacity>
      </View>
      <SearchBody
        lyrics={lyrics}
        title={title}
        artistItems={artistItems}
        isHidden={isHidden}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60
  },
  inputContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  inputStyle: {
    width: 250,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 65,
    backgroundColor: "rgba(153,153,153,1)",
    color: "rgba(255, 255, 255, 0.9)",
    marginHorizontal: 25,
    marginBottom: 10
  },
  inputIcon: {
    position: "absolute",
    top: 7,
    left: 310
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  btnFind: {
    width: 130,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  findText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center"
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

export default ForYouScreen;
