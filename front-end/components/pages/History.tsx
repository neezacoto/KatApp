import React, { useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import Chat from "../Chat";
import GearModal from "../GearModal";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import QRChat from "../QRChat";
import UserContext from "../../Context/UserContext";

const History: React.FC = ({ navigation, modalizeRef }: any) => {
  const onOpenModal = () => {
    modalizeRef.current?.open();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.leftControls}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR History</Text>
        <View style={styles.rightControls}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onOpenModal} // Open modal on press
          >
            <AntDesign name="setting" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <QRChat />
    </View>
  );
};

const styles = StyleSheet.create({
  leftControls: {
    position: "absolute",
    left: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rightControls: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 12,
    justifyContent: "center",
    gap: 6,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 18,
    paddingBottom: 18,
    backgroundColor: "#D391F2",
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  iconButton: {
    padding: 10,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.50)", // Change the opacity here
  },
  modalContent: {
    padding: 20, // Add padding for content inside modal
  },
});

export default History;
