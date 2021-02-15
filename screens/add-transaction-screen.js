import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


global.colors = {
  main: '#0E6251',
  text: '#E8F8F5',
  shade1: '#117864'
}

export default function AddTransaction({navigation}) {

  const isFocused = useIsFocused();
  const [description, updateDescription] = useState('')
  const [amount, updateAmount] = useState()

  if(isFocused) {
    
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.main }}>
        <View style={{justifyContent: 'center', position: 'relative', bottom: '17%'}}>
          <Text style={{
            textAlign: 'center',
            fontSize: 40,
            top: 18,
            fontFamily: 'Rubik_400Regular',
            color: colors.text
          }}>Add A Transaction</Text>
        <Text style={{justifyContent: 'center', position: 'relative', top: '30%', textAlign: 'center', fontFamily: 'Rubik_400Regular_Italic', color: colors.text, fontSize: 18}}>Your Current Balance is ${currentBudget}</Text>
        </View>
        <View style={{position: 'relative', top: '-5%'}}>
        <Text style={{position: 'relative', textAlign: 'center', fontSize: 20, bottom: '5%', fontFamily: 'Rubik_400Regular', color: colors.text}}>New Transaction</Text>
        <TextInput
          id='descriptionInput'
          style={{position: 'relative', width: 330, fontSize: 15, borderColor: 'gray', borderWidth: 2, top: '0%', color: colors.text, borderRadius: 50, paddingStart: 10, height: '15%'}}
          placeholder=' Description'
          placeholderTextColor= {colors.text}
          onChangeText={(value) => {
            updateDescription(value)
            transaction.name = value
          }}
          value={description}
          />
        <TextInput
          style={{position: 'relative', width: 330, fontSize: 15, borderColor: 'gray', borderWidth: 2, top: '0%', color: colors.text, borderRadius: 50, paddingStart: 10, height: '15%', top: '5%'}}
          keyboardType= 'numeric'
          placeholder= ' Amount'
          placeholderTextColor= {colors.text}
          onChangeText={(value) => {
            updateAmount(value)
            transaction.amount = value
          }}
          value={amount}
          />
        <View style={{position: 'relative', marginTop: '10%'}}>
        <View style={{position: 'relative'}}><Button
        title="Expense"
        onPress={() => {
          Keyboard.dismiss()
          createTransaction = true
          transaction.type = "expense"
          transaction.name = transaction.name
          transaction.amount = Number(transaction.amount).toFixed(2)
          if (transaction.name && transaction.amount) {
            navigation.navigate('MyBudget', transaction)
          }
          updateDescription('')
          updateAmount()
        }
        }
        />
        </View>
        <View style={{position: 'relative', marginTop: '5%'}}>
        <Button
        color='green'
        title="Deposit"
        onPress={() => {
          Keyboard.dismiss()
          createTransaction = true
          transaction.type = "deposit"
          transaction.amount = Number(transaction.amount).toFixed(2)
          if (transaction.name && transaction.amount) {
          navigation.navigate('MyBudget', transaction)
          }
          updateDescription('')
          updateAmount()
        }
        }
        />
        </View>
        </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    transactionInput: {
      position: 'relative',
      width: 330,
      fontSize: 15,
      borderColor: 'gray',
      borderWidth: 2,
      top: '0%'
    },
    addBtn: {
      top: 280
    },

    expenseBtn: {
      maxWidth: 150
    },

    depositBtn: {
      maxWidth: 150,
      left: 160,
      bottom: 37
    },

    transactionType: {
      top: 30
    },
  });
  