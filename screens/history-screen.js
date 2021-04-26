import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";



export default function HistoryScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);


  if (isFocused) {
      
  }
  if (historyArray.length === 0) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
          <Text style={{
                fontSize: 30,
                textAlign: "center",
                color: colors.text,
                fontFamily: "Rubik_400Regular",
                paddingTop: 5
              }}>HISTORY</Text>
          <Text
            style={{
              alignContent: "center",
              justifyContent: "center",
              position: "relative",
              color: colors.text,
              fontSize: 15,
              fontFamily: "Rubik_400Regular_Italic",
              paddingHorizontal: 10,
              textAlign: 'center'
            }}
          >
            You don't have any past transactions yet... but this is where they will show up
          </Text>
          <View style={{
              border: true,
              marginTop: 10,
              borderWidth: 2,
              flex: .98,
              width: '95%',
              borderColor: '#E8F8F5',
              opacity: .5,
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 15
          }}>
            <Text style={{
              alignContent: "center",
              justifyContent: "center",
              position: "relative",
              color: colors.text,
              fontSize: 20,
              fontFamily: "Rubik_400Regular_Italic",
              paddingHorizontal: 10,
              textAlign: 'center'
            }} >it's empty here...</Text>
          </View>
         
        </View>
        
      )
  } else {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
          <Text style={{
                fontSize: 30,
                textAlign: "center",
                color: colors.text,
                fontFamily: "Rubik_400Regular",
                flex: .06,
                paddingTop: 5
              }}>HISTORY</Text>
          <Text
            style={{
              alignContent: "center",
              justifyContent: "center",
              position: "relative",
              color: colors.text,
              fontSize: 20,
              fontFamily: "Rubik_400Regular_Italic",
              flex: .05
            }}
          >
            your past transactions...
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
                          historyArray
                            .map(function (e) {
                              return e.key;
                            })
                            .indexOf(item.key)
                        );
                        historyArray.splice(pos, 1);
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
              }}
            >
              <View style={item.date.length < 7 ? styles.transactionItemMonth : styles.transactionItem}>
                <Text style={item.date.length < 7 ? styles.itemDateMonth : styles.itemDate}>{item.date}</Text>
                <Text style={ item.date.length < 7 ? styles.itemNameMonth : styles.itemName}>{item.name.length < 15
                    ? `${item.name}`
                    : `${item.name.substring(0, 12)}...`}</Text>
                <View style={styles.buffer}>
                  <Text style={item.amount.length < 7 ? styles.itemAmountHistory : styles.itemAmountHistoryLarge}>${item.amount}
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
  itemNameMonth: {
    alignContent: "center",
    textAlign: "left",
    paddingLeft: 5,
    marginTop: -10,
    fontSize: 25,
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
  itemDateMonth: {
    alignContent: "center",
    textAlign: 'right',
    paddingRight: 10,
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Rubik_400Regular",
    color: "#E8F8F5",
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
  transactionItemMonth: {
    borderWidth: 6,
    borderRadius: 20,
    borderTopWidth: 25,
    height: 80,
    marginTop: 10,
    borderColor: colors.text,
    backgroundColor: "#464646",
    borderColor: '#464646'
  },
  itemAmountHistory: {
    alignContent: "center",
    textAlign: "right",
    fontSize: 30,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 55,
    paddingRight: 5,
  },

  itemAmountHistoryLarge: {
    alignContent: "center",
    textAlign: 'right',
    fontSize: 25,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 55,
    paddingRight: 5
  },
})