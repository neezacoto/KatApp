// Profile.tsx
import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfilePicture from "../ProfilePicture"; // Ensure this path is correct
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import GearModal from "../GearModal";
import UserContext from "../../Context/UserContext";

const Profile: React.FC = ({ modalizeRef }: any) => {
  const navigation = useNavigation();
  const [editable, setEditable] = useState<boolean>(false);

  const {
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

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const onOpenModal = () => {
    modalizeRef.current?.open();
  };

  const getInputStyle = (isEditable: boolean) => {
    return isEditable
      ? [styles.input, styles.editableInput] // Apply "after" styles when editable
      : [
          styles.input,
          {
            shadowOffset: { width: 2, height: 3 }, // X and Y offset of shadow
            shadowOpacity: 0.25, // 25% opacity
            shadowRadius: 4, // Blur radius
            elevation: 1,
          },
        ]; // Apply "before" styles when not editable
  };

  return (
    <View style={{ backgroundColor: "#D391F2", flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.leftControls}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-right" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.rightControls}>
          {editable ? (
            <TouchableOpacity onPress={toggleEdit}>
              <MaterialCommunityIcons name="check" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleEdit}>
              <MaterialCommunityIcons name="pencil" size={30} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onOpenModal} // Open modal on press
          >
            <AntDesign name="setting" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: "transparent" }]}
          contentInsetAdjustmentBehavior="never"
        >
          <View style={{ position: "relative", flex: 1 }}>
            <View style={styles.contentContainer}>
              <ProfilePicture />
              <Text style={styles.nameTitle}>{name || "Name"}</Text>

              {editable && (
                <>
                  <View style={styles.descContainer}>
                    <Text
                      style={[
                        styles.desc,
                        { marginTop: 12 },
                        styles.headerDesc,
                      ]}
                    >
                      Name
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        styles.headerText,
                        getInputStyle(editable),
                        { color: "white" },
                      ]}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                  <View
                    style={[styles.descContainer, styles.headerDescContainer]}
                  >
                    <Text style={[styles.desc, styles.headerDesc]}>Age</Text>
                    <TextInput
                      style={[
                        styles.input,
                        styles.headerText,
                        getInputStyle(editable),
                        { color: "white" },
                      ]}
                      value={age}
                      onChangeText={setAge}
                    />
                  </View>
                  <View
                    style={[styles.descContainer, styles.headerDescContainer]}
                  >
                    <Text style={[styles.desc, styles.headerDesc]}>Breed</Text>
                    <TextInput
                      style={[
                        styles.input,
                        styles.headerText,
                        getInputStyle(editable),
                        { color: "white" },
                      ]}
                      value={breed}
                      onChangeText={setBreed}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
          {!editable && (
            <View style={styles.infoCardContainer}>
              <View style={styles.infoCard}>
                <View style={styles.infoContainer}>
                  <View style={styles.infoHeader}>
                    <Text>Breed</Text>
                  </View>
                  <View>
                    <Text style={styles.infoText}>{breed || "Breed"}</Text>
                  </View>
                </View>

                <View
                  style={{
                    height: "80%",
                    width: 1,
                    backgroundColor: "#D0D0D0",
                  }}
                />

                <View style={styles.infoContainer}>
                  <View style={styles.infoHeader}>
                    <Text>Age</Text>
                  </View>
                  <View>
                    <Text style={styles.infoText}>{age || "Age"}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={styles.scrollView}>
            <View style={styles.descContainer}>
              <Text style={[styles.desc, styles.bruh]}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bubble, getInputStyle(editable)]}
                value={bio}
                onChangeText={setBio}
                editable={editable}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.descContainer}>
              <Text style={[styles.desc, styles.bruh]}>Diet</Text>
              <TextInput
                style={[styles.input, styles.bubble, getInputStyle(editable)]}
                value={diet}
                onChangeText={setDiet}
                editable={editable}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={[styles.descContainer, { marginBottom: 100 }]}>
              <Text style={[styles.desc, styles.bruh]}>Medical History</Text>
              <TextInput
                style={[styles.input, styles.bubble, getInputStyle(editable)]}
                value={medicalHistory}
                onChangeText={setMedicalHistory}
                editable={editable}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCardContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    zIndex: 0,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoHeader: {},
  infoText: { fontSize: 26 },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 86,
    borderRadius: 10,
    position: "absolute",
    top: -44,
    zIndex: 999,

    shadowColor: "#000000", // Shadow color as hex
    shadowOffset: { width: 2, height: 3 }, // X and Y offset of shadow
    shadowOpacity: 0.25, // 25% opacity
    shadowRadius: 4, // Blur radius
    elevation: 1,
  },
  nameTitle: { color: "white", fontSize: 32, fontWeight: "bold" },
  leftControls: {
    position: "absolute",
    left: 20,
  },
  rightControls: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 12,
  },
  headerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  editableInput: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "white",
    color: "white",
  },
  headerDesc: {
    fontSize: 18,
    color: "white",
  },
  iconButton: {
    padding: 10,
  },
  bruh: {
    fontSize: 16,
    marginBottom: 8,
  },
  scrollView: {
    flex: 2,
    width: "100%",
    borderColor: "white",

    padding: 10,
    backgroundColor: "white",
    paddingTop: 18,
    paddingBottom: 0,
  },

  descContainer: { width: "100%", marginBottom: 18 },
  desc: {
    color: "black",
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: "#D391F2",
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
    padding: 20,
    paddingBottom: 5,
    backgroundColor: "#D391F2",
  },
  bubble: {
    height: 130,
  },
  input: {
    borderWidth: 0,
    borderColor: "white",
    padding: 16,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
  },
});

export default Profile;

/**
shadowColor: "#000000", // Shadow color as hex
    shadowOffset: { width: 2, height: 3 }, // X and Y offset of shadow
    shadowOpacity: 0.25, // 25% opacity
    shadowRadius: 4, // Blur radius
    elevation: 1,
 */
