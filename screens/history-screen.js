import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";


export default function HistoryScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);

    let historyArray = [{
      name: "asd",
      amount: 0,
      type: "",
      key: "dsfsd",
      date: "",
    }];

  if (isFocused && addHistory) {
    for (let i = 0; i < budgetsArray.length; i++) {
      for (let i = 0; i < budgetsArray[i].transactions.length; i++) {
        historyArray.unshift(budgetsArray[i].transactions[i])
       }
    }
    //budgetsArray.map(x => historyArray.unshift(x.transactions))
    alert(JSON.stringify(historyArray))
        // Set add history to false
        addHistory = false;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
      <Text style={{
            fontSize: 30,
            textAlign: "center",
            color: colors.text,
            fontFamily: "Rubik_400Regular",
          }}>HISTORY</Text>
      <Text
        style={{
          alignContent: "center",
          justifyContent: "center",
          position: "relative",
          color: colors.text,
          fontSize: 20,
          fontFamily: "Rubik_400Regular_Italic",
        }}
      >
        work in progress...
      </Text>
      
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main}}> 
      <FlatList
      style={styles.flatList}
      data={historyArray}
      renderItem={({ item }) =>
      (
        // TRANSACTION ITEM
        <TouchableScale
          activeScale={0.9}
          onLongPress={() => {
            Alert.alert(
              "Do you want to delete this transaction?",
              "This action can not be undone!",
              [
                {
                  text: "Yes, Delete!",
                  onPress: () => {
                    let pos = JSON.stringify(
                      stashArray
                        .map(function (e) {
                          return e.key;
                        })
                        .indexOf(item.key)
                    );
                    if (item.type === "stash") {
                      stashTotal =
                        parseFloat(stashTotal) -
                        parseFloat(item.amount);
                      }

                    stashArray.splice(pos, 1);
                    initRefresh(refresh + 1);
                    saveData();
                  },
                },
                {
                  text: "Cancel, Dont Delete",
                  onPress: () => {},
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );

            //Alert.alert(pos)
          }}
        >
          <View style={styles.transactionItem}>
            <Text style={styles.itemDate}>{item.date}</Text>
            <Text style={styles.itemName}>{item.name.length < 15
                ? `${item.name}`
                : `${item.name.substring(0, 12)}...`}</Text>
            <View style={styles.buffer}>
              <Text style={item.amount.length < 7 ? styles.itemAmountStash : styles.itemAmountStashLarge}>${item.amount}
                  </Text>
            </View>
          </View>
        </TouchableScale>
      )}
      keyExtractor={item => item.key}
      />
      </View>
     
    </View>
    
  )
}

const styles = StyleSheet.create({
  flatList: {
    maxWidth: "95%",
    width: 375,
    flex: 1,
    maxHeight: '100%',
  },
  itemName: {
    alignContent: "center",
    textAlign: "left",
    paddingLeft: 5,
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
    bottom: 20,
  },

  itemDate: {
    alignContent: "center",
    textAlign: 'right',
    paddingRight: 10,
    marginTop: 10,
    fontSize: 15,
    fontFamily: "Rubik_400Regular",
    color: "#464646",
    bottom: 32,
  },
  transactionItem: {
    borderWidth: 4,
    borderRadius: 20,
    borderTopWidth: 25,
    height: 100,
    marginTop: 10,
    borderColor: colors.text,
    backgroundColor: "#464646",
  },
  itemAmountStash: {
    alignContent: "center",
    textAlign: "right",
    fontSize: 30,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 55,
    paddingRight: 5
  },

  itemAmountStashLarge: {
    alignContent: "center",
    textAlign: 'right',
    fontSize: 25,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 55,
    paddingRight: 5
  },
})