import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import { Button } from 'react-native';
import * as Updates from 'expo-updates';
import MyBudget from './my-budget-screen';



export default function SettingsScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);

    const resetApp = () => {
        Alert.alert(
            "WARNING: Do you wish to reset the app?",
            "Doing so will delete all of your saved data. Including your history, stash, budget, transactions, etc.. Continue only if you wish to start fresh as if downloading the app for the first time",
            [
              {
                text: "Yes, Delete!",
                onPress: () => {
                // Delete all saved data
                  clearAsyncStorage();
                // Reload app to show changes
                  Updates.reloadAsync();
                },
              },
              {
                text: "Cancel, Dont Reset",
                onPress: () => {},
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
    }

    const save = () => {
      Alert.alert(
        "WARNING: Do you wish to save your budget?",
        "This will clear your current transactions from your home screen and save them to the history page",
        [
          {
            text: "Yes, Save!",
            onPress: () => {
            // Add this months transaction array to the history array
      historyArray = transactionsArray.concat(historyArray)
      // Empty Transaction Array
      transactionsArray = [];
      // Set current budget to budget
      currentBudget = myBudget
      // Save changes
      saveData();
      // alert
      alert('Budget Saved!')
            },
          },
          {
            text: "Cancel, Dont Save",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }

  if (isFocused) {
      
  }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
          <Text style={styles.header}>Settings</Text>
          <TouchableScale style={styles.item} onPress={() => {navigation.navigate('SetBudget');}}><Text style={styles.itemText}>Set Budget</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={() => {save();}}><Text style={styles.itemText}>Save</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={() => {resetApp();}}><Text style={styles.itemText}>Reset</Text></TouchableScale>
        </View>
      );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 35,
        textAlign: "center",
        color: colors.text,
        fontFamily: "Rubik_400Regular",
        flex: .1,
        paddingTop: 5
    },
    item: {
        flex: .07,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        width: '90%',
        marginBottom: 5,
        opacity: 1,
    },
    itemText: {
        fontSize: 25,
        textAlign: "center",
        color: colors.text,
        fontFamily: "Rubik_400Regular",
        opacity: 1,
    }
});