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
import { Keyboard } from "react-native";
/*
global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};
*/

export default function SetBudget({ navigation }) {
  let newBudget;
  const [amount, updateAmount] = useState();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        backgroundColor: setBudgetColors.main,
      }}
    >
      <TouchableOpacity onPress={() => {Keyboard.dismiss()}} activeOpacity={1}>
      <View style={{flex: 1.2, alignContent: 'center', justifyContent: 'flex-start'}}>
      <Text
        style={{
          position: "relative",
          color: colors.text,
          fontSize: 35,
          fontFamily: "Rubik_400Regular",
          paddingTop: 10,
          textAlign: 'center'
        }}
      >
        What is your budget?
      </Text>
      <Text
        style={{
          position: "relative",
          color: colors.text,
          fontSize: 20,
          fontFamily: "Rubik_300Light",
          paddingTop: 15,
          textAlign: 'center'
        }}
      >
        Your budget should be based on how much money you would like to spend in a month.
      </Text>
      </View>

      <View style={{ alignContent: 'center', justifyContent: 'flex-end', alignSelf: 'center'}}>
      <TextInput
        style={styles.budgetInput}
        keyboardType="numeric"
        onChangeText={(value) => {
          updateAmount(value);
          newBudget = value
        }}
        value={amount}
      />
      </View>
      
      <View
        style={{
          position: "relative",
          justifyContent: 'flex-start',
          alignContent: "center",
          alignSelf: 'center',
          flex: 1,
          paddingBottom: '70%'
        }}
      >
        <SetBudgetButton
          title="Set Budget"
          onPress={() => {
            if (amount < 9999999) {
            myBudget = amount;
            currentBudget = amount;
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
            updateAmount();
            } else if (amount > 9999999){
              Alert.alert('You gotta set a smaller budget buddy...')
            } else if (amount === undefined) {
              Alert.alert('Come on dude you gotta set a budget first...')
            }
            Keyboard.dismiss();
          }}
        />
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  budgetInput: {
    position: "relative",
    width: 200,
    fontSize: 35,
    borderColor: colors.text,
    borderWidth: 2,
    color: colors.text,
    borderRadius: 50,
    paddingStart: 0,
    height: 65,
    textAlign: "center"
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
