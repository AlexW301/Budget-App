import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";



export default function SettingsScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);


  if (isFocused) {
      
  }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
          <Text style={styles.header}>Settings</Text>
          <TouchableScale style={styles.item} onPress={alert('Button Pressed')}><Text style={styles.itemText}>Settings</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={alert('Button Pressed')}><Text style={styles.itemText}>Settings</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={alert('Button Pressed')}><Text style={styles.itemText}>Settings</Text></TouchableScale>
          <TouchableScale style={styles.item} onPress={alert('Button Pressed')}><Text style={styles.itemText}>Settings</Text></TouchableScale>
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