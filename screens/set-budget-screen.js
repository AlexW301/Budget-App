import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { color } from "react-native-reanimated";
import SetBudgetButton from "../components/set-budget-button";

global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};

export default function SetBudget({ navigation }) {
  let newBudget;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0E6251",
      }}
    >
      <Text
        style={{
          position: "relative",
          color: colors.text,
          fontSize: 35,
          fontFamily: "Rubik_300Light",
          top: "35%",
        }}
      >
        What is your budget?
      </Text>
      <TextInput
        style={styles.budgetInput}
        keyboardType="numeric"
        onChangeText={(value) => (newBudget = value)}
      />
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignContent: "center",
          bottom: "25%",
        }}
      >
        <SetBudgetButton
          title="Set Budget"
          onPress={() => {
            if (newBudget < 9999999) {
            myBudget = newBudget;
            currentBudget = newBudget;
            for (var i = 0; i < transactionsArray.length; i++) {
              if (transactionsArray[i].type === "expense") {
                currentBudget =
                  parseFloat(currentBudget) -
                  parseFloat(transactionsArray[i].amount);
              } else if (transactionsArray[i].type === "deposit") {
                currentBudget =
                  parseFloat(currentBudget) +
                  parseFloat(transactionsArray[i].amount);
              }
            }
            saveData();
            navigation.navigate("MyBudget", currentBudget);
            } else {
              Alert.alert('You need to set a smaller budget buddy...')
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  budgetInput: {
    position: "relative",
    width: "50%",
    fontSize: 35,
    borderColor: colors.text,
    borderWidth: 2,
    top: "-15%",
    color: colors.text,
    borderRadius: 50,
    paddingStart: 0,
    height: "9%",
    textAlign: "center",
    marginTop: "100%",
    marginBottom: "-40%",
  },
});

/*  OLD BUTTON
  <Button
          onPress={() => {
            myBudget = newBudget
            currentBudget = newBudget
            for (var i = 0; i < transactionsArray.length; i++) {
              if (transactionsArray[i].type === 'expense'){
                currentBudget = parseFloat(currentBudget) - parseFloat(transactionsArray[i].amount)
              } else if (transactionsArray[i].type === 'deposit'){
                currentBudget = parseFloat(currentBudget) + parseFloat(transactionsArray[i].amount)
              }
            }
            saveData()
            navigation.navigate('MyBudget', currentBudget)
          }}
          title="Set Budget"
          />
  */
