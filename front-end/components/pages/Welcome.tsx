// Welcome.tsx
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  navigation: any;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ height: 90 }}>
          <Image
            source={require("./KatApp.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonPress, styles.signup]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={[styles.buttonText, styles.signupText]}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonPress, styles.login]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 16,
    width: "100%",
    paddingBottom: 18,
  },
  buttonText: { fontSize: 24, color: "white", fontWeight: "500" },
  buttonPress: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8F33BB",
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  signupText: {
    color: "#8F33BB",
    fontWeight: "bold",
  },
  signup: {
    backgroundColor: "transparent",
    borderColor: "#8F33BB",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,

    backgroundColor: "white",
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  login: {
    backgroundColor: "#8F33BB",
  },
});

export default Welcome;
