import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
  Image,
  ScrollView
} from "react-native";
import { Camera, Permissions } from "expo-camera";
import { Overlay } from "react-native-elements";
import alex from "../assets/alex-profile.jpg";

export default function FaceCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [yourFacePic, setYourFacePic] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={(ref) => (this.camera = ref)}
      onCameraReady={async () => {
        let yourFace = await this.camera
          .takePictureAsync()
          .then((face) => {
            setYourFacePic(face.uri)
          })
          .catch((error) => {
            alert("error: ", error);
          });
      }}
    >
        <Image source={{uri: yourFacePic}} style={{height: '100%', width: '100%'}} />
    </Camera>
  );
}

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
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
