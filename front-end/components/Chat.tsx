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
  Keyboard,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useCameraPermissions } from "expo-camera/next";
import { BarcodeScanner } from "./BarcodeScanner";
import UserContext from "../Context/UserContext";
import { Message, Product } from "../Context/types";
import { Feather } from "@expo/vector-icons";

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
        text: `you are roleplaying as an AI that can change the users cat information and give advice, if the text that proceeds this is not talking about cats or their cat's health or asking to change their info, please redirect the conversation to that of such, you are a cat AI venetian assistant, agree with their request to change info: ${text}`, // This is the text you want to send to the backend
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchJson = async (
  text: string,
  name: string,
  age: string,
  breed: string,
  bio: string,
  diet: string,
  medicalHistory: string
) => {
  try {
    const response = await axios.post(
      "https://mycatgpt392.azurewebsites.net/CatJson",
      {
        // text: text, // This is the text you want to send to the backend
        text: text,
        name: name,
        age: age,
        breed: breed,
        bio: bio,
        diet: diet,
        medicalHistory: medicalHistory,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const Chat: React.FC = () => {
  const {
    hasIntro,
    setHasIntro,
    setScanHistory,
    messageHistory,
    setMessageHistory,
    name,
    age,
    breed,
    bio,
    diet,
    medicalHistory,
    setName,
    setAge,
    setBreed,
    setBio,
    setDiet,
    setMedicalHistory,
  } = useContext(UserContext);
  const [inputText, setInputText] = useState<string>("");
  const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [focusing, setFocusing] = useState<boolean>(false);
  const [displayResponse, setDisplayResponse] = useState("");
  const [completedTyping, setCompletedTyping] = useState(true);
  const flatListRef = useRef<FlatList<Message>>(null);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [newestOtherMessage, setNewestOtherMessage] = useState<Message | null>(
    null
  );
  const [inputOpacity] = useState(new Animated.Value(1));
  // Define the animated value outside of the useEffect
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // New function to handle the input focus
  const handleInputFocus = (focus: boolean) => {
    setFocusing(true);
    scrollToBottom();
    Animated.timing(qrButtonScale, {
      toValue: 0, // Scale up when focused
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // New function to handle the input blur
  const handleInputBlur = () => {
    setFocusing(false);
    Animated.timing(qrButtonScale, {
      toValue: 1, // Scale down when not focused
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animateText = (message: string) => {
    setCompletedTyping(false);
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayResponse(message.slice(0, i));
      i++;

      if (i > message.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
        // Once the animation completes, add the message to the main list
        setMessageHistory((prevMessages) => [
          ...prevMessages,
          newestOtherMessage,
        ]);
        setNewestOtherMessage(null); // Clear the newest other message
      }
    }, 20);

    return () => clearInterval(intervalId);
  };

  // Function to start the pulsing animation
  const startPulsing = () => {
    scaleAnim.setValue(1); // Reset the scale to start the animation from beginning
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1, // Loop indefinitely
      }
    ).start();
  };

  useEffect(() => {
    console.log(hasIntro);
    if (hasIntro) return;

    startPulsing();

    const reply: Message = {
      id: Date.now(),
      text: "Hi I'm A.V.A your Ai Veterinarian Assistant!\nI'd love to hear more about your cat, what's their name and overall history?",
      sender: "other",
    };

    // Instead of immediately adding to messages, set it as the newest other message
    setNewestOtherMessage(reply);

    flatListRef.current?.scrollToEnd({ animated: true });
    scaleAnim.stopAnimation();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

    setHasIntro(true);
  }, []);
  useEffect(() => {
    // Animate the opacity when completedTyping changes
    Animated.timing(inputOpacity, {
      toValue: completedTyping ? 1 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [completedTyping]);

  const height = useHeaderHeight();
  const handleOpenCamera = () => {
    setIsScannerVisible(true);
  };

  useEffect(() => {
    // Subscribe to keyboard show and hide events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToBottom
    );

    // Cleanup the listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const qrButtonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (newestOtherMessage) {
      animateText(newestOtherMessage.text);
    }
  }, [newestOtherMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [messageHistory]);

  // Request camera permission if it has not been granted
  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // ... other code

  const sendMessage = async (): Promise<void> => {
    if (!completedTyping) return;
    startPulsing();
    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };
    setMessageHistory((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");

    const json = await fetchJson(
      inputText,
      name,
      age,
      breed,
      bio,
      diet,
      medicalHistory
    );
    console.log(json);
    if (json.Name !== "") {
      setName(json.Name);
    }
    if (json.Age !== "") {
      setAge(json.Age);
    }
    if (json.Breed !== "") {
      setBreed(json.Breed);
    }
    if (json.Bio !== "") {
      setBio(json.Bio);
    }
    if (json.Diet !== "") {
      setDiet(json.Diet);
    }
    if (json.MedicalHistory !== "") {
      setMedicalHistory(json.MedicalHistory);
    }
    const replyText = await fetchMessage(inputText);
    const reply: Message = {
      id: Date.now(),
      text: replyText,
      sender: "other",
    };

    // Instead of immediately adding to messages, set it as the newest other message
    setNewestOtherMessage(reply);

    flatListRef.current?.scrollToEnd({ animated: true });
    scaleAnim.stopAnimation();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }: ListRenderItemInfo<Message>) => {
    const messageStyle =
      item.sender === "user" ? styles.userMessage : styles.otherMessage;

    // Function to handle opening a URL
    const handlePressLink = async (url: string) => {
      // Check if the URL can be opened
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        // Open the URL if it's supported
        await Linking.openURL(url);
      } else {
        console.error("Failed to open URL: " + url);
      }
    };

    // Determine if the message should be clickable based on isLink
    if (item.link) {
      return (
        <View
          style={[
            styles.messageContainer,
            item.sender === "user"
              ? styles.userContainer
              : styles.otherContainer,
          ]}
        >
          <TouchableOpacity onPress={() => handlePressLink(item.link)}>
            <Text style={[messageStyle, { color: "#5080bf" }]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.messageContainer,
            item.sender === "user"
              ? styles.userContainer
              : styles.otherContainer,
          ]}
        >
          <Text style={messageStyle}>{item.text}</Text>
        </View>
      );
    }
  };

  const fetchProductDetails = async (barcode: string) => {
    try {
      const response = await axios.post(
        "https://mycatgpt392.azurewebsites.net/Scan", // Ensure this matches your actual endpoint
        { Barcode: barcode }
      );
      return response.data; // Returns the API response with product details
    } catch (error) {
      console.error("Error fetching product details:", error);
      return `Error fetching product details: ${error}`;
    }
  };

  const handleBarcodeScanned = async ({ type, data }: any) => {
    setIsScannerVisible(false);
    startPulsing(); // Start pulsing animation

    // Initial scan message
    const scanMessage: Message = {
      id: Date.now(),
      text: `Scanned barcode: ${data} of type ${type}`,
      sender: "other",
    };

    setMessageHistory((prevMessages) => [...prevMessages, scanMessage]);

    // Fetch product details
    const productDetails: Product = await fetchProductDetails(data);

    // Assuming productDetails is an array of products with their details
    let allProducts = "";
    // productDetails.forEach((product: any, index: any) => {
    //   const message = `Review Rating: ${product.reviewRating}\nReview Count: ${product.reviewCount}\nPrice: ${product.price}\nLink: ${product.link}\nTitle: ${product.title}`;
    //   const detailMessage: Message = {
    //     id: Date.now() + index + 1, // Ensure unique IDs for each message
    //     text: message,
    //     sender: "other",
    //   };
    //   allProducts += message;
    //   setMessageHistory((prevMessages) => [...prevMessages, detailMessage]);
    // });

    //pasting

    allProducts = JSON.stringify(productDetails, null, 2);

    const waitMessage: Message = {
      id: Date.now(), // Ensure unique IDs for each message
      text: "Writing a review:",
      sender: "other",
    };

    // Add reply to messages
    setMessageHistory((prevMessages) => [...prevMessages, waitMessage]);

    const toSend = `GPT give me a concise review of this product, list out the product details before hand, then review it, give the concerns, pros and cons, and which I might like best to keep my cat healthy of the following: "${allProducts}"`;

    const replyText = await fetchMessage(toSend);

    const reply: Message = {
      id: Date.now(),
      text: replyText,
      sender: "other",
    };

    setScanHistory((prevScanHistory) => [...prevScanHistory, reply]);

    // Add reply to messages
    setMessageHistory((prevMessages) => [...prevMessages, reply]);

    if (productDetails.sellerSpecificOffers[0]?.sellerLink) {
      const link: string = productDetails.sellerSpecificOffers[0].sellerLink;
      const linkText: Message = {
        id: Date.now(),
        text: `I found a seller for you on Amazon:\n${link}`,
        sender: "other",
        link: link,
      };

      setMessageHistory((prevMessages) => [...prevMessages, linkText]);
    }
    if (productDetails.sellerSpecificOffers[1]?.sellerLink) {
      const link: string = productDetails.sellerSpecificOffers[1].sellerLink;
      const linkText: Message = {
        id: Date.now(),
        text: `I found a seller for you on Amazon:\n${link}`,
        sender: "other",
        link: link,
      };

      setMessageHistory((prevMessages) => [...prevMessages, linkText]);
    }
    if (productDetails.sellerSpecificOffers[2]?.sellerLink) {
      const link: string = productDetails.sellerSpecificOffers[2].sellerLink;
      const linkText: Message = {
        id: Date.now(),
        text: `I found a seller for you on Amazon:\n${link}`,
        sender: "other",
        link: link,
      };

      setMessageHistory((prevMessages) => [...prevMessages, linkText]);
    }

    // Scroll to the bottom
    flatListRef.current?.scrollToEnd({ animated: true });

    scaleAnim.stopAnimation(); // Stop the pulsing animation

    // Trigger a spring animation upon receiving the product details
    Animated.spring(scaleAnim, {
      toValue: 1, // Animate back to the original scale
      friction: 3, // Make it a bit bouncy
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {isScannerVisible ? (
        <BarcodeScanner
          onBarcodeScanned={handleBarcodeScanned}
          setIsScannerVisible={setIsScannerVisible}
        />
      ) : (
        <>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.pfp}>
                <Animated.View
                  style={[
                    styles.pfpDot,
                    {
                      transform: [{ scale: scaleAnim }], // Bind the animated value to the scale transform
                    },
                  ]}
                />
              </View>
              <Text style={styles.headerName}>Ava</Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={styles.status}></View>
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              ref={flatListRef}
              data={messageHistory}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListFooterComponent={() =>
                newestOtherMessage && !completedTyping ? (
                  <View
                    style={[styles.messageContainer, styles.otherContainer]}
                  >
                    <Text style={styles.otherMessage}>{displayResponse}</Text>
                  </View>
                ) : null
              }
            />
          </View>
          <KeyboardAvoidingView
            keyboardVerticalOffset={height + 140}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
          >
            <View style={styles.sendContainer}>
              <Animated.View // Make this an Animated.View to animate its properties
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: focusing ? 0 : 8,
                  marginLeft: focusing ? -32 : 0,
                  transform: [{ scale: qrButtonScale }], //I want this to scale to
                }}
              >
                <TouchableOpacity onPress={handleOpenCamera}>
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={38}
                    color="#36004F"
                  />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={[{ opacity: inputOpacity, flex: 1, height: 60 }]}
              >
                <TextInput
                  editable={completedTyping}
                  style={[
                    styles.input,
                    !completedTyping ? { opacity: 0.5 } : {}, // Set opacity to 0.8 when typing is not completed
                  ]}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type a message..."
                  onFocus={handleInputFocus} // Attach the focus event here
                  onBlur={handleInputBlur} // Attach the blur event here
                />
              </Animated.View>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !completedTyping ? { opacity: 0.5 } : {},
                ]}
                onPress={sendMessage}
              >
                <AntDesign name="right" size={32} color="#E9E9E9" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fakeText: {
    backgroundColor: "red",
  },
  statusContainer: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#CBCBCB",
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
    color: "#714279",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  pfp: {
    backgroundColor: "#D391F2",
    width: 50,
    height: 50,
    borderRadius: 12,
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
    backgroundColor: "white",
    height: 68,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 20,

    shadowColor: "#000000", // Shadow color as hex
    shadowOffset: { width: 2, height: 3 }, // X and Y offset of shadow
    shadowOpacity: 0.25, // 25% opacity
    shadowRadius: 4, // Blur radius
    elevation: 1,
  },
  listContainer: { flex: 8, paddingHorizontal: 10 },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 46,
    borderRadius: 8,
    backgroundColor: "#BE75E1",
    paddingLeft: 3,
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
    borderRadius: 8,
    height: 50,
    backgroundColor: "#E8E2E2",
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "80%", // Set a max-width for the message bubbles
  },
  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#B8E293", // Light green color for the user message
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

export default Chat;
