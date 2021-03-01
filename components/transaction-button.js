import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale

global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};

export default function TransactionButton({ title, onPress, style }) {
  return (
    <View style={style}>
      <TouchableScale
            onPress={onPress}
            activeScale={0.9}
        >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.text,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: "#0B5345",
    alignContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 9,
  },

  buttonText: {
    position: "relative",
    justifyContent: "center",
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    fontSize: 20,
  },
});
