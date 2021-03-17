import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";


export default function StashScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);

  if (isFocused && createTransaction && stashTransaction.type === "stash") {
      // Give stash transaction a unique key
      stashTransaction.key = shortid.generate();
      // Push stash transaction to array
      stashArray.unshift(stashTransaction);
      // SAVE current data
      saveData();
      // Clear stash transaction variable
      stashTransaction = {
        name: "",
        amount: 0,
        type: "expense",
        key: "",
      };
      createTransaction = false;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
      <Text>Stash Screen</Text>
      <Text>${Number(stashTotal).toFixed(2)}</Text>
      <View>
      <FlatList
      style={styles.flatList}
      data={stashArray}
      renderItem={({ item }) =>
      (
        // STASH ITEM
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
    maxHeight: '90.2%',
    backgroundColor: 'blue'
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
    marginTop: 10,
    fontSize: 15,
    fontFamily: "Rubik_400Regular",
    color: "#464646",
    left: 265,
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