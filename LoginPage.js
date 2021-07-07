import React, { useEffect, useState } from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Login(props) {
  const [value, setValue] = useState(1);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setValue(0);
  }, [run]);

  useEffect(() => {
    setValue(10);
  }, []);
  return (
    <View style={styles.container}>
      

      <ImageBackground source={require("./piza.jpg")} style={styles.image}>
      <Button
        title="Login with time display"
        onPress={() =>
          props.navigation.navigate("SecondPage", {
            user:
              "The Time is => " +
              new Date().getHours() +
              ":" +
              new Date().getMinutes() +
              ":" +
              new Date().getSeconds(),
          })
        }
      />
        <Button
          style={styles.Button}
          title="Login"
          color="#dc143c"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => props.navigation.navigate("SecondPage")}
        />
        <Text style={styles.text}>Home Page</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  Button: {
    width: "400px",
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
  },
});
