// GearModal.js
import { useNavigation } from "@react-navigation/native";
import React, { forwardRef, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import UserContext from "../Context/UserContext";

const GearModal = forwardRef((props, ref) => {
  const { email } = useContext(UserContext);
  const navigation = useNavigation();
  const handleSignout = () => {
    if (ref.current) {
      ref.current.close(); // This closes the modal
    }
    navigation.navigate("Welcome"); // Navigate to Welcome screen
  };
  return (
    <Modalize
      ref={ref}
      adjustToContentHeight
      modalStyle={styles.modalStyle}
      handlePosition="inside"
      overlayStyle={styles.overlay}
      handleStyle={styles.handle}
    >
      <View style={[styles.modalContent, { marginTop: 16 }]}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.info}>{email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Password:</Text>
          <Text style={styles.info}>******</Text>
        </View>
        <TouchableOpacity
          onPress={handleSignout}
          style={styles.signoutContainer}
        >
          <Text style={styles.signoutText}>Signout</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "#0C0C0C",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.50)",
  },
  handle: {
    marginTop: 10,
    width: 100,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 20,
  },
  signoutText: {
    color: "darkgray",
    fontSize: 18,
  },
  signoutContainer: {
    borderColor: "darkgray",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 32,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    flexDirection: "row",
    paddingVertical: 12,
    marginBottom: 18,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  title: { color: "white", fontSize: 16, fontWeight: "bold" },
  info: { color: "white", marginLeft: 8 },
});

export default GearModal;
