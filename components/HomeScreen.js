import React, { useState, useEffect } from "React";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { ListItem } from "react-native-elements";
import * as firebase from "firebase";

const HomeScreen = props => {
  const { navigate } = props.navigation;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let currentuser;
  let listItems;

  useEffect(() => {
    getFavorites();
  }, []);

  //Read data from firebase and save it to variable Data
  const getFavorites = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        currentuser = user.uid;
        firebase
          .database()
          .ref(currentuser)
          .child("favorites")
          .on("value", snapshot => {
            const firebaseData = snapshot.val();
            if (firebaseData == null) {
              Alert.alert("Go to search tab to add favorites");
              setIsLoading(false);
            } else {
              const listItems = Object.values(firebaseData);
              setData(listItems);
              setIsLoading(false);
            }
          });
      } else {
        Alert.alert("Could not get favorites");
      }
    });
  };

  //Delete item from firebase after pressed
  const deleteItem = index => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        currentuser = user.uid;
        firebase
          .database()
          .ref(currentuser)
          .child("favorites")
          .on("value", snapshot => {
            const firebaseData = snapshot.val();
            listItems = Object.keys(firebaseData);
          });
        const item_key = listItems[index];
        firebase
          .database()
          .ref(currentuser)
          .child("favorites")
          .child(item_key)
          .remove();
      } else {
        Alert.alert("Could not remove favorite");
      }
    });
  };

  const renderItems = ({ item, index }) => {
    return (
      <ListItem
        title={item.song}
        subtitle={item.artist}
        rightSubtitle="Delete"
        rightSubtitleProps={{ onLongPress: () => deleteItem(index) }}
        onPress={() => navigate("Lyrics", { data: item })}
        bottomDivider
        chevron
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadcontainer}>
        <ActivityIndicator size="large" animating />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loadcontainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60
  },
  flatlist: {
    marginTop: 20,
    marginLeft: "5%",
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

export default HomeScreen;
