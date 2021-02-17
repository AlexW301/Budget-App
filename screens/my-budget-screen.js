import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AddTransaction from './add-transaction-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';


global.colors = {
    main: '#0E6251',
    text: '#E8F8F5',
    shade1: '#117864'
  }

export default function MyBudget({navigation}) {

    const [visible, setVisible] = useState(false);
  
    const [refresh, initRefresh] = useState(1)
   
    /////////// ADD TRANSACTION VARIABLE TO THE ARRAY //////////////////////////////////////////

    const isFocused = useIsFocused();
    // If myBudget (from this screen) doesnt equal the budget from the other screen, update them
    if (isFocused) {
        if (createTransaction) {
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
            createTransaction = false
        }

    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.main}}>
            <TouchableOpacity style={{alignContent: 'center', justifyContent: 'center', position: 'relative', width: '100%', top: '13%'}}
                onPress={() => { navigation.navigate('SetBudget') }}>
                <Text style={{fontSize: 30, textAlign: 'center',
                color: colors.text, fontFamily: 'Rubik_400Regular'}}>Your Budget is ${myBudget}</Text>
            </TouchableOpacity>
            <Text style={{alignContent: 'center', justifyContent: 'center', position: 'relative', marginTop: '23%', color: colors.text, fontSize: 20,
                    fontFamily: 'Rubik_400Regular_Italic'}}>you have...</Text>
            <Text style={{alignContent: 'center', justifyContent: 'center', position: 'relative', fontSize: 50, fontFamily: 'Rubik_700Bold',
                    color: colors.text}}>${currentBudget}</Text>
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
                                                onPress: () => { },
                                                style: 'cancel'
                                            }
                                        ],
                                        { cancelable: false }
                                    );

                                    //Alert.alert(pos)
                                }}>
                                    <View style={styles.transactionItem}>
                                        <Text style={styles.itemDate}>{item.date}</Text>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <View style={styles.buffer}><Text style={styles.itemAmount}>-${item.amount}</Text></View>
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
                                            onPress: () => { },
                                            style: 'cancel'
                                        }
                                    ],
                                    { cancelable: false }
                                );


                                //Alert.alert(pos)
                            }}>
                                <View style={styles.transactionItem}>
                                <Text style={styles.itemDate}>{item.date}</Text>
                                    <Text style={styles.itemName}>{item.name} </Text>
                                    <View style={styles.buffer}><Text style={styles.itemAmount}>${item.amount}</Text></View>
                                </View>
                            </TouchableOpacity>
                    }
                />

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

    buttonView: {
      top: -10
    },

    flatList: {
        alignContent: 'center',
        position: 'relative',
        bottom: '-5%',
        height: '86%',
        maxHeight: '86%',
        maxWidth: '90%',
        width: 375,
    }, 
    
    itemName: {
        alignContent: 'center',
        marginTop: 10,
        fontSize: 22,
        fontFamily: 'Rubik_400Regular',
        color: colors.text,
        left: 15,
        bottom: 20
    },

    itemDate: {
        alignContent: 'center',
        marginTop: 10,
        fontSize: 15,
        fontFamily: 'Rubik_400Regular',
        color: '#464646',
        left: 265,
        bottom: 32
    },

    itemAmount: {
      alignContent: 'center',
      marginTop: 10,
      fontSize: 30,
      color: colors.text,
      fontFamily: 'Rubik_500Medium',
      bottom: 25
    },

    buffer: {
      bottom: 40,
      left: 228
    },
    
    transactionItem: {
      borderWidth: 5,
      borderRadius: 20,
      borderTopWidth:25,
      height: 100,
      marginTop: 10,
      borderColor: colors.text,
      backgroundColor: '#464646'
    }
  });