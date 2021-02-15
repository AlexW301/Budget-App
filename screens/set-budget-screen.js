import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';

global.colors = {
  main: '#0E6251',
  text: '#E8F8F5',
  shade1: '#117864'
}

export default function SetBudget({navigation}) { 
  let newBudget
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0E6251' }}>
        <Text style={{ position: 'relative', color: colors.text, fontSize: 35, fontFamily: 'Rubik_300Light'}}>What is your budget?</Text>
        <TextInput
          style={styles.budgetInput}
          keyboardType= 'numeric'
          onChangeText={(value) => newBudget = value}
          
          />
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
      </View>
    );
  };

  const styles = StyleSheet.create({
    budgetInput: {
      height: 40,
      width: 150, 
      fontSize: 20,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 25,
      fontFamily: 'Rubik_500Medium',
      color: colors.text,
      marginBottom: '5%',
      marginTop: '5%'
    }
  });
  