// Settings.tsx
import React from "react";
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Settings: React.FC = ({ navigation }: any) => {
  const handleLogout = () => {
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Add other settings options here */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={36} color="white" />
        </TouchableOpacity>
      </View>
      {/* Logout button at the bottom */}
      <TouchableOpacity style={styles.buttonPress} onPress={handleLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  buttonText: { fontSize: 24, color: "black", fontWeight: "500" },
  buttonPress: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    color: "white",
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between", // Ensures the button is at the bottom
    backgroundColor: "black",
    paddingBottom: 24,
    alignItems: "center",
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  logoutContainer: {
    padding: 20, // Padding for aesthetic spacing
    width: "100%", // Full width button
  },
  // Add other styles for your settings items here
});

export default Settings;
