import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  ListRenderItemInfo,
  TouchableOpacity,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import { useHeaderHeight } from "@react-navigation/elements";
import UserContext from "../Context/UserContext";

type Message = {
  id: number;
  text: string;
  sender: "user" | "other";
};

// const dummyResponses: string[] = [
//   "Hello there!",
//   "How are you?",
//   "That's interesting, tell me more.",
//   "I'm not sure about that.",
//   "Goodbye!",
// ];

const fetchMessage = async (text: string) => {
  try {
    const response = await axios.post(
      "https://mycatgpt392.azurewebsites.net/HelloWorld",
      {
        text: text, // This is the text you want to send to the backend
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const QRChat: React.FC = () => {
  const flatListRef = useRef<FlatList<Message>>(null);

  const { scanHistory } = useContext(UserContext);
  // Define the animated value outside of the useEffect
  //   const scaleAnim = useRef(new Animated.Value(1)).current;

  //   const sendMessage = async (): Promise<void> => {
  //     startPulsing();
  //     const newMessage: Message = {
  //       id: Date.now(),
  //       text: inputText,
  //       sender: "user",
  //     };
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);

  //     // Clear input field
  //     setInputText("");

  //     const replyText = await fetchMessage(inputText);

  //     const reply: Message = {
  //       id: Date.now(),
  //       text: replyText,
  //       sender: "other",
  //     };

  //     // Add reply to messages
  //     setMessages((prevMessages) => [...prevMessages, reply]);

  //     // Scroll to the bottom
  //     flatListRef.current?.scrollToEnd({ animated: true });
  //     scaleAnim.stopAnimation();

  //     // Trigger a spring animation upon message receipt
  //     Animated.spring(scaleAnim, {
  //       toValue: 1, // Animate back to the original scale
  //       friction: 3, // Make it a bit bouncy
  //       useNativeDriver: true,
  //     }).start();
  //   };

  const renderItem = ({ item }: ListRenderItemInfo<Message>) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userContainer : styles.otherContainer,
      ]}
    >
      <Text
        style={
          item.sender === "user" ? styles.userMessage : styles.otherMessage
        }
      >
        {item.text}
      </Text>
    </View>
  );
  const height = useHeaderHeight();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          ref={flatListRef}
          data={scanHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 32,
  },
  statusText: {
    color: "white",
    marginLeft: 6,
    fontSize: 10,
    marginTop: 3,
  },
  status: {
    width: 16,
    height: 16,
    backgroundColor: "#93F071",
    borderRadius: 50,
  },
  headerName: {
    color: "white",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  pfp: {
    backgroundColor: "#261E1A",
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pfpDot: {
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  header: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#0C0C0C",
    height: 76,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 20,
  },
  listContainer: { flex: 8, paddingHorizontal: 10 },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  sendContainer: {
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%", // Set a max-width for the message bubbles
  },
  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5", // Light green color for the user message
  },
  otherContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA", // Light grey color for the other message
  },
  userMessage: {
    color: "black",
  },
  otherMessage: {
    color: "black",
  },
});

export default QRChat;
