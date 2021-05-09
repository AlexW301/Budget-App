import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { color } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/*
// GLOBAL VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

const shortid = require('shortid');
let currentBudget = 500
let myBudget = 500
let transaction = {
  name: "",
  amount: 0,
  type: "expense",
  key: ""
}
let transactionsArray = []

let recreatedTransactionsArray = []

/*
// LOCAL STORAGE AND SAVING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
const saveData = () => {
  let myBudgetSave = myBudget
  let currentBudgetSave = JSON.stringify(currentBudget)
  
  AsyncStorage.setItem('myBudget', myBudgetSave);
  AsyncStorage.setItem('currentBudget', currentBudgetSave);
  AsyncStorage.setItem('transactionsArray', JSON.stringify(transactionsArray))
}

const displayData = async () => {
  try{
    let myBudgetSave = await AsyncStorage.getItem('myBudget');
    let currentBudgetSave = await AsyncStorage.getItem('currentBudget');
    let transactionsArraySave = await AsyncStorage.getItem('transactionsArray')
    myBudget = myBudgetSave
    currentBudget = JSON.parse(currentBudgetSave)
    let transactionsArrayParsed = JSON.parse(transactionsArraySave)

    if (transactionsArray !== null) 
    {
      for(var i = 0; i < transactionsArrayParsed.length; i++){
        let newTransaction = {
          name: transactionsArrayParsed[i].name,
          amount: transactionsArrayParsed[i].amount,
          type: transactionsArrayParsed[i].type,
          key: transactionsArrayParsed[i].key
        }
        recreatedTransactionsArray.push(newTransaction)
      }
      transactionsArray = recreatedTransactionsArray
    }
  }
  catch(error) {
    alert(error);
  }
}

let clearAsyncStorage = async() => {
  AsyncStorage.clear();
}


function LoadingScreen({navigation}) {
  displayData();
  setTimeout(() => {
    navigation.navigate('MyBudget')
  }, 200)
  return (
    <View></View>
  )
}

/*
// MY BUDGET / HOME PAGE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

function MyBudget({navigation}) {

  const [visible, setVisible] = useState(false);

  const [refresh, initRefresh] = useState(1)
 
  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    Alert.alert(item.name)
    setVisible(false);
  };
  /////////// ADD TRANSACTION VARIABLE TO THE ARRAY //////////////////////////////////////////
  const isFocused = useIsFocused();
  if (isFocused) {
    if (transaction.name !== '' && transaction.amount !== 0) {
      // Give transaction unique id
      transaction.key = shortid.generate();
      // Push transaction to begining of array
      transactionsArray.unshift(transaction);
      // Update Current Budget
      if (transaction.type === 'deposit') {
        currentBudget = parseFloat(currentBudget) + parseFloat(transaction.amount)
      } else if (transaction.type === 'expense') {
        currentBudget = parseFloat(currentBudget) - parseFloat(transaction.amount)
      }
      // SAVE current budget
      saveData()

      // Clear transaction variable
      transaction = {
        name: "",
        amount: 0,
        type: "expense",
        key: ""
      }
   }
   
  }
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: -50 }}>
      
      <TouchableOpacity
      onPress={() => {navigation.navigate('SetBudget')}}>
      <Text style={styles.myBudgetTitle}>My Budget is ${myBudget}</Text>
      </TouchableOpacity>
      <Text style={styles.subTitle}>I have</Text>
      <Text style={styles.currentBudget}>${currentBudget}</Text>
      <View style={styles.buttonView}>
      
      <FlatList
      style={styles.flatList}
      data={transactionsArray}
      renderItem={({ item }) => 
      item.type === 'expense' ?
      (
        // EXPENSE ITEM
        <TouchableOpacity onLongPress={() => {
          Alert.alert(
            'Do you want to delete this transaction?',
            'This action can not be undone!',
            [
              {
                text: 'Yes, Delete!',
                onPress: () => {
                  let pos = JSON.stringify(transactionsArray.map(function (e) { return e.key; }).indexOf(item.key))
                  if (item.type === 'expense') {
                    currentBudget = parseFloat(currentBudget) + parseFloat(item.amount)
                  } else if (item.type === 'deposit') {
                    currentBudget = parseFloat(currentBudget) - parseFloat(item.amount)
                  }
  
                  transactionsArray.splice(pos, 1)
                  saveData();
                  initRefresh(refresh + 1)
                }
              },
              {
                text: 'Cancel, Dont Delete',
                onPress: () => {},
                style: 'cancel'
              }
            ],
            { cancelable: false }
          );

          //Alert.alert(pos)
        }}>
        <View style={styles.transactionItemExpense}>
        <Text style={styles.expenseItemName}>{item.name} </Text> 
        <View style={styles.buffer}><Text style={styles.expenseItemAmount}>-${item.amount}</Text></View>
        </View>
        
        </TouchableOpacity>
        // DEPOSIT ITEM
      ) : 
      <TouchableOpacity onLongPress={() => {
        Alert.alert(
          'Do you want to delete this transaction?',
          'This action can not be undone!',
          [
            {
              text: 'Yes, Delete!',
              onPress: () => {
                let pos = JSON.stringify(transactionsArray.map(function (e) { return e.key; }).indexOf(item.key))
                if (item.type === 'expense') {
                  currentBudget = parseFloat(currentBudget) + parseFloat(item.amount)
                } else if (item.type === 'deposit') {
                  currentBudget = parseFloat(currentBudget) - parseFloat(item.amount)
                }

                transactionsArray.splice(pos, 1)
                saveData();
                initRefresh(refresh + 1)
              }
            },
            {
              text: 'Cancel, Dont Delete',
              onPress: () => {},
              style: 'cancel'
            }
          ],
          { cancelable: false }
        );
        

        //Alert.alert(pos)
      }}>
        <View style={styles.transactionItemDeposit}>
        <Text style={styles.depositItemName}>{item.name} </Text> 
        <View style={styles.buffer}><Text style={styles.depositItemAmount}>${item.amount}</Text></View>
        </View>
      </TouchableOpacity>
    }
      />
      <View style={styles.btnBtnView}>
      <Button
      style={styles.addTransactionBtn}
      title="Add Transaction"
      onPress={() => navigation.navigate('AddTransaction', currentBudget)}
      />
      </View>
      
      </View>
    </View>
  );
};

function SetBudget({navigation}) {
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Set Budget Screen</Text>
      <TextInput
        style={styles.budgetInput}
        keyboardType= 'numeric'
        onChangeText={(value) => currentBudget = value}
        />
        <Button
        onPress={() => {
          myBudget = currentBudget
          saveData()
          for (var i = 0; i < transactionsArray.length; i++) {
            if (transactionsArray[i].type === 'expense'){
              currentBudget = parseFloat(currentBudget) - parseFloat(transactionsArray[i].amount)
            } else if (transactionsArray[i].type === 'deposit'){
              currentBudget = parseFloat(currentBudget) + parseFloat(transactionsArray[i].amount)
            }
          }
          navigation.navigate('MyBudget', currentBudget)
        }}
        title="Set Budget"
        />
    </View>
  );
};

/*
// ADD A TRANSACTION PAGE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
function AddTransaction({navigation}) {
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.addTransactionHeader}>
      <Text style={styles.addTransactionTitle}>Add Transaction</Text>
      <Text style={styles.currentBalanceText}>Your Current Balance is ${currentBudget}</Text>
      </View>
      <View style={styles.transactionInputFields}>
      <Text style={styles.transactionName}>Transaction Name</Text>
      <TextInput
        style={styles.transactionNameInput}
        onChangeText={(value) => transaction.name = value}
        />
      <Text style={styles.transactionAmount}>Transaction Amount</Text>
      <TextInput
        style={styles.transactionNameInput}
        keyboardType= 'numeric'
        onChangeText={(value) => transaction.amount = value}
        />
      <View style={styles.transactionType}>
      <View style={styles.expenseBtn}><Button
      color='red'
      title="Expense"
      onPress={() => {
        transaction.type = "expense"
        transaction.amount = Number(transaction.amount).toFixed(2)
        if (transaction.name && transaction.amount)
        navigation.navigate('MyBudget', transaction)
      }
      }
      />
      </View>
      <View style={styles.depositBtn}>
      <Button
      color='green'
      title="Deposit"
      onPress={() => {
        transaction.type = "deposit"
        transaction.amount = Number(transaction.amount).toFixed(2)
        if (transaction.name && transaction.amount)
        navigation.navigate('MyBudget', transaction)
      }
      }
      />
      </View>
      </View>
      <View style={styles.addBtn}>
      <Button
      style={styles.addTransactionBtn2}
      title="Add Transaction"
      onPress={() => navigation.navigate('MyBudget', transaction)}
      // Check that inputs are recording the input information into to object
      //onPress={() => Alert.alert(transaction.name, transaction.amount)}
      />
      </View>
      </View>
    </View>
  );
};
/*
// NAVIGATION STACK ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
const Stack = createStackNavigator();

export default function Vintage() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="LoadingScreen" headerMode="none">
        <Stack.Screen name="MyBudget" component={MyBudget} options={{ title: 'My Budget' }} />
        <Stack.Screen name="SetBudget" component={SetBudget} options={{ title: 'Set Budget' }} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} options={{ title: 'Add Transaction' }} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{title: 'Loading Screen'}} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};
// TEST // BOTTOM TAB NAVIGATION ///////////////////////////////////////////////////////////////////////////
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="LoadingScreen" headerMode="none">
      <Tab.Screen name="MyBudget" component={MyBudget} options={{ title: 'My Budget' }} />
      <Tab.Screen name="SetBudget" component={SetBudget} options={{ title: 'Set Budget' }} />
      <Tab.Screen name="AddTransaction" component={AddTransaction} options={{ title: 'Add Transaction' }} />
      <Tab.Screen name="LoadingScreen" component={LoadingScreen} options={{title: 'Loading Screen'}} />
    </Tab.Navigator>
  );
}

/*
// STYLE SHEET /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetInput: {
    height: 40,
    width: 70, 
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 2
  },
  myBudgetTitle: {
    alignContent: 'center',
    marginTop: 10,
    fontSize: 30
  },
  subTitle: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic'
  },
  currentBudget: {
    alignContent: 'center',
    fontSize: 35,
    color: 'green'
  },
  
  buttonView: {
    top: -10
  },

  btnBtnView: {
    top: 125
  },
  
  addTransactionBtn: {
    marginTop: 4000
  },
  addTransactionBtn2: {
    top: 400,
    color: 'red'
  },
  transactionName: {
    alignContent: 'center',
    marginTop: 0,
    fontSize: 30
  },
  transactionNameInput: {
    height: 40,
    width: 275, 
    fontSize: 15,
    borderColor: 'gray',
    borderWidth: 2,
    top: 5
  },
  addTransactionHeader: {
    top: -200,
    alignContent: 'center',
    fontSize: 40
  },
  addTransactionTitle: {
    alignContent: 'center',
    fontSize: 40,
    top: 25
  },
  currentBalanceText: {
    alignContent: 'center',
    fontSize: 15,
    top: 20
  },
  transactionInputFields: {
    top: -100
  },
  transactionAmount: {
    alignContent: 'center',
    fontSize: 30
  },
  addBtn: {
    top: 280
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatList: {
    marginTop: -50,
    borderWidth: 0,
    top: 100,
    height: 500,
    maxHeight: 500,
    maxWidth: 375,
    width: 375
  }, 
  deleteBtn: {
    color: 'red',
    paddingRight: 100,
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
  expenseItemName: {
    alignContent: 'center',
    marginTop: 10,
    fontSize: 22,
    
  },
  expenseItemAmount: {
    alignContent: 'center',
    marginTop: 10,
    fontSize: 30,
    color: 'red',

  },

  depositItemName: {
    alignContent: 'center',
    marginTop: 10,
    fontSize: 22,
  },
  depositItemAmount: {
    alignContent: 'center',
    marginTop: 10,
    fontSize: 30,
    color: 'green'
  },
  buffer: {
    bottom: 45,
    left: 237
  },
  transactionItemExpense: {
    borderWidth: 2,
    borderRadius: 20,
    borderTopWidth:20,
    height: 100,
    marginTop: 5,
    borderColor: 'red'
  },
  transactionItemDeposit: {
    borderWidth: 2,
    borderRadius: 20,
    borderTopWidth:20,
    height: 100,
    marginTop: 5,
    borderColor: 'green'
  }
});
