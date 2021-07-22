import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarCodeIcon from "../Barcode-scanner.jpg"

export default class ScanScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <Image source={BarCodeIcon}/>
          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : "Request Camera Permission"}
          </Text>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermissions}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  displayText: {
    fontSize: 15,
    textDecorationLine: "underline",
  },

  scanButton: {
    backgroundColor: "#D3D3D3",
    margin: 10,
    padding: 10,
  },

  buttonText: {
    fontSize: 20,
  },
});
