import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Linking,
  Image,
  Platform,
} from "react-native";
import axios from "axios";

// Define an interface for the offer to ensure type safety
interface Offer {
  title: string;
  price: string;
  reviewRating?: string;
  reviewCount?: string;
  link: string;
}

interface ScanProps {}

const Scan: React.FC<ScanProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event) => {
        // Cast the event target to HTMLInputElement to access the files property
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          setFile(file); // Store the file object directly
          // Optionally, set an image URI for displaying the selected image
          setImageUri(URL.createObjectURL(file));
        }
      };
      input.click();
    }
  };

  const uploadImage = async () => {
    if (!file) {
      console.error("No image selected.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://mycatgpt392.azurewebsites.net/Scan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Select Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button
        title="Upload and Fetch Offers"
        onPress={uploadImage}
        disabled={loading}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : results.length > 0 ? (
        results.map((item, index) => (
          <View key={index} style={styles.resultItem}>
            <Text>Name: {item.title}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Rating: {item.reviewRating || "Not available"}</Text>
            <Text>Reviews: {item.reviewCount || "Not available"}</Text>
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL(item.link)}
            >
              View on Amazon
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResultsText}>
          No results found or waiting for input.
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  resultItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
  noResultsText: {
    textAlign: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Scan;
