import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};

export default function SetBudgetButton({ title, onPress }) {
  return (
    <View style={{ flex: 1, position: "relative", justifyContent: "center" }}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
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
    paddingHorizontal: 105,
    paddingVertical: 14,
  },

  buttonText: {
    position: "relative",
    justifyContent: "center",
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    fontSize: 27,
  },
});
