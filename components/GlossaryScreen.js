import React, { useState } from "React";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
import { ListItem } from "react-native-elements";

const GlossaryScreen = props => {
  const [chord, setChord] = useState("");
  const [chordItems, setChordItems] = useState([]);

  //Fetch all chords similiar to the search input
  const findChords = () => {
    const url = "https://api.uberchord.com/v1/chords?nameLike=" + chord;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        setChordItems(responseJson);
        setChord("");
      })
      .catch(error => {
        Alert.alert("No chords found");
      });
  };

  //Show chords on a list 
  const renderItems = ({ item, index }) => {
    const name = item.chordName.replace(/,/g, "");
    return <ListItem title={name} subtitle={item.strings} bottomDivider />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          value={chord}
          placeholder="Type chord name"
          placeholderTextColor={"rgba(255, 255, 255, 0.9)"}
          onChangeText={chord => setChord(chord)}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnFind} onPress={findChords}>
            <Text style={styles.findText}>FIND</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={chordItems}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
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
    flexDirection: "row",
    justifyContent: "space-around",
    margin: (20, 15, 5, 15)
  },
  inputStyle: {
    width: 200,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "rgba(153,153,153,1)",
    color: "rgba(255, 255, 255, 0.9)",
    paddingLeft: 40
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  btnFind: {
    width: 100,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    alignItems: "center"
  },
  findText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center"
  }
});

export default GlossaryScreen;
