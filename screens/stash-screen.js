import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";


export default function StashScreen({ route, navigation }) {
    const isFocused = useIsFocused();

  if (isFocused === false) {
      
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
      <Text>Stash Screen</Text>
      <Text>{stashTotal}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  
})