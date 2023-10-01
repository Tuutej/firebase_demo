import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQrJ-7RpUCZUP4F12j50TofarZUzfN8so",
  authDomain: "fir-demo-3be4a.firebaseapp.com",
  databaseURL:
    "https://fir-demo-3be4a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-demo-3be4a",
  storageBucket: "fir-demo-3be4a.appspot.com",
  messagingSenderId: "823452195902",
  appId: "1:823452195902:web:357c67fd88dc862022856f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [items, setItems] = useState({});

  ref(database, "items/");

  const saveItem = () => {
    push(ref(database, "items/"), product);
  };

  const removeItem = (itemKey) => {
    remove(ref(database, `items/${itemKey}`));
  };

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(data || {});
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product"
        onChangeText={(title) => setProduct({ ...product, title })}
        value={product.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={(amount) => setProduct({ ...product, amount })}
        value={product.amount}
      />
      <Button onPress={saveItem} title="Save" />
      <FlatList
        data={Object.keys(items)}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={{ fontSize: 24 }}>
              {items[item].title}, {items[item].amount}{" "}
              <Text
                style={{ fontSize: 24, color: "#0000ff" }}
                onPress={() => removeItem(item)}
              >
                bought
              </Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  input: {
    fontSize: 32,
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  listItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});
