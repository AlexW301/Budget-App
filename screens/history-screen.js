import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import { Overlay } from "react-native-elements";



export default function HistoryScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);

    const [isVisible, setIsVisible] = React.useState(false);

    const [currentPosition, setCurrentPosition] = useState(0);


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
              fontSize: 20,
              fontFamily: "Rubik_400Regular_Italic",
              paddingHorizontal: 10,
              textAlign: 'center'
            }}
          >
            your past transactions...
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
              textAlign: 'center',
              paddingBottom: 40
            }} >You don't have any past transactions yet... they will start showing up here at the beginning of a new month when you recieve your monthly report.</Text>
            <Text style={{
              alignContent: "center",
              justifyContent: "center",
              position: "relative",
              color: colors.text,
              fontSize: 20,
              fontFamily: "Rubik_400Regular_Italic",
              paddingHorizontal: 10,
              textAlign: 'center'
            }} >If you need to you can also manually save all your transactions to the history from the settings page using the "Save Monthly Budget" button.</Text>
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
              onPress={() => {
                setCurrentPosition(
                  JSON.stringify(
                    historyArray
                      .map(function (e) {
                        return e.key;
                      })
                      .indexOf(item.key)
                  )
                );
                setIsVisible(true);
              }}
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
              <Overlay
                    backdropStyle={{opacity: .7}}
                    isVisible={isVisible}
                    ModalComponent={Modal}
                    onBackdropPress={() => setIsVisible(!isVisible)}
                    overlayStyle={styles.transactionItemExpanded}
                  >
                    <Text style={styles.itemDateExpanded }>{historyArray[currentPosition].date}</Text>
                    <ScrollView>
                      <Text style={styles.itemNameExpanded }>{historyArray[currentPosition].name}</Text>
                    </ScrollView>
                    <Text style={styles.itemAmountExpanded }>{historyArray[currentPosition].date.length < 7 ? historyArray[currentPosition].amount < 0 ? `-$${JSON.stringify(historyArray[currentPosition].amount).substring(2, historyArray[currentPosition].amount.length + 1)}` : `$${historyArray[currentPosition].amount}` : `-$${historyArray[currentPosition].amount}`}</Text>
                    <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                      <Text style={{ color: "white" }}>Click to close</Text>
                    </TouchableOpacity>
                  </Overlay>
              <View style={item.date.length < 7 ? styles.transactionItemMonth : styles.transactionItem}>
                <Text style={item.date.length < 7 ? styles.itemDateMonth : styles.itemDate}>{item.date}</Text>
                <Text style={ item.date.length < 7 ? styles.itemNameMonth : styles.itemName}>{item.name.length < 15
                    ? `${item.name}`
                    : `${item.name.substring(0, 12)}...`}</Text>
                <View style={styles.buffer}>
                  <Text style={item.amount.length < 7 ? styles.itemAmountHistory : styles.itemAmountHistoryLarge}>{item.date.length < 7 ? item.amount < 0 ? `-$${JSON.stringify(item.amount).substring(2, item.amount.length + 1)}` : `$${item.amount}` : `-$${item.amount}`}
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
    maxWidth: "97%",
    width: 425,
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
    width: '95%',
    alignSelf: 'center'
  },
  transactionItemMonth: {
    borderWidth: 6,
    borderRadius: 20,
    borderTopWidth: 25,
    height: 80,
    marginTop: 10,
    borderColor: colors.text,
    backgroundColor: "#464646",
    borderColor: '#464646',
    width: '95%',
    alignSelf: 'center'
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
  transactionItemExpanded: {
    borderWidth: 4,
    borderRadius: 20,
    borderTopWidth: 25,
    height: 300,
    marginTop: 10,
    borderColor: colors.text,
    backgroundColor: "#464646",
    width: '92%'
  },

  itemNameExpanded: {
    alignContent: "center",
    textAlign: "left",
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
  },

  itemAmountExpanded: {
    alignContent: "center",
    justifyContent: 'center',
    textAlign: "right",
    marginTop: 10,
    fontSize: 40,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
  },

  itemDateExpanded: {
    alignContent: "center",
    textAlign: "center",
    marginTop: 5,
    fontSize: 25,
    fontFamily: "Rubik_700Bold",
    color: colors.text,
  },
})