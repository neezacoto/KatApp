import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import axios from "axios";
import Router from "./components/Router";
import Chat from "./components/Chat";
import { UserProvider } from "./Context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

/**
 * <Text>{message}</Text>
 * <Button title="Fetch Message" onPress={fetchMessage}
 */
