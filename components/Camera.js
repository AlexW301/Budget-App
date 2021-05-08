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
import { Camera, Permissions } from 'expo-camera';

export default function FaceCamera() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    
      }, []);

    return (
        <Camera style={styles.camera} type={type} ref={ref => this.camera = ref} onCameraReady={ async () => {
            let yourFace = await this.camera.takePictureAsync().then((face) => {
                alert(face.uri) 
                return(
                    face.uri
                )
            }).catch((error) => {alert('error: ', error)})
            
            
            
            }}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    alert(yourFace)
                }}>
                  <Text>dshjfhsdhjkfhsdjkf</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.front
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
              </TouchableOpacity>
            </View>
          </Camera>
    )
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
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
});