import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import { Button } from 'react-native';
import * as Updates from 'expo-updates';



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
                  clearAsyncStorage();
                  // Need way to reload app for changes to show
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

  if (isFocused) {
      
  }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
          <Text style={styles.header}>Settings</Text>
          <TouchableScale style={styles.item} onPress={() => {alert('button pressed')}}><Text style={styles.itemText}>Settings</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={() => {alert('button pressed')}}><Text style={styles.itemText}>Settings</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={() => {alert('button pressed')}}><Text style={styles.itemText}>Settings</Text></TouchableScale>
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