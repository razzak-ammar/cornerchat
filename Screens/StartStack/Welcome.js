import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@react-native-material/core";

const Welcome = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.main}>Welcome to Corner Chat</Text>
      <Button
        title="Login"
        style={styles.button}
        onPress={() => props.navigation.push("Login")}
      >
        Login
      </Button>
      <Button
        title="Dashboard"
        style={styles.button}
        onPress={() => props.navigation.push("Dashboard")}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    fontSize: 50,
    textAlign: "center",
  },
  button: {
    width: 100,
    alignSelf: "center",
    margin: 10,
  },
});

export default Welcome;
