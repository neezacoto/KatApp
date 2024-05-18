import React, { useState, useCallback } from "react";
import { CameraView } from "expo-camera/next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type BarcodeScannerComponentProps = {
  onBarcodeScanned: (scanningResult: any) => void; // Type according to your specific needs
  setIsScannerVisible: (isScannerVisible: any) => any;
};

export const BarcodeScanner: React.FC<BarcodeScannerComponentProps> = ({
  onBarcodeScanned,
  setIsScannerVisible,
}) => {
  const [facing, setFacing] = useState<"front" | "back">("back");

  const toggleFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleBarCodeScanned = useCallback(
    (scanningResult: any) => {
      onBarcodeScanned(scanningResult);
    },
    [onBarcodeScanned]
  );

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsScannerVisible(false)}
          >
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
