import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import { Overlay } from "react-native-elements";



export default function StashScreen({ route, navigation }) {

    const isFocused = useIsFocused();

    const [refresh, initRefresh] = useState(1);

    const [isVisible, setIsVisible] = React.useState(false);

    const [currentPosition, setCurrentPosition] = useState(0);

  if (isFocused && createTransaction && stashTransaction.type === "stash" || stashTransaction.type === "withdraw") {
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
  if (stashArray.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
        <Text style={{
              fontSize: 30,
              textAlign: "center",
              color: colors.text,
              fontFamily: "Rubik_400Regular",
              paddingTop: 5
            }}>Welcome To The Stash</Text>
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
          your current stash is...
        </Text>
        <Text style={{
            alignContent: "center",
            justifyContent: "center",
            position: "relative",
            fontSize: 50,
            fontFamily: "Rubik_700Bold",
            color: colors.text,
          }}>${Number(stashTotal).toFixed(2)}</Text>

<View style={{
              border: true,
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
            }} >Your Stash is the excess money you save or recieve that does not count towards your monthly budget.</Text>
            <Text style={{
              alignContent: "center",
              justifyContent: "center",
              position: "relative",
              color: colors.text,
              fontSize: 20,
              fontFamily: "Rubik_400Regular_Italic",
              paddingHorizontal: 10,
              textAlign: 'center'
            }} >Your stash will automatically fill up or decrease at the end of each month based on your budget performance. You can also make manual entries via the add transaction screen.</Text>
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
              paddingTop: 5
            }}>Welcome To The Stash</Text>
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
          your current stash is...
        </Text>
        <Text style={{
            alignContent: "center",
            justifyContent: "center",
            position: "relative",
            fontSize: 50,
            fontFamily: "Rubik_700Bold",
            color: colors.text,
          }}>${Number(stashTotal).toFixed(2)}</Text>
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main}}> 
        <FlatList
        style={styles.flatList}
        data={stashArray}
        renderItem={({ item }) =>
        (
          // STASH ITEM
          <TouchableScale
            activeScale={0.9}
            onPress={() => {
              setCurrentPosition(
                JSON.stringify(
                  stashArray
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
                        } else if (item.type === "withdraw") {
                          stashTotal =
                            parseFloat(stashTotal) +
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
            <Overlay
                    backdropStyle={{opacity: .7}}
                    isVisible={isVisible}
                    ModalComponent={Modal}
                    onBackdropPress={() => setIsVisible(!isVisible)}
                    overlayStyle={styles.transactionItemExpanded}
                  >
                    <Text style={styles.itemDateExpanded }>{stashArray[currentPosition].date}</Text>
                    <ScrollView>
                      <Text style={styles.itemNameExpanded }>{stashArray[currentPosition].name}</Text>
                    </ScrollView>
                    <Text style={styles.itemAmountExpanded }>{stashArray[currentPosition].type === "stash" && stashArray[currentPosition].amount > 0 ? "$" : "-$"}{stashArray[currentPosition].amount < 0 ? JSON.stringify(stashArray[currentPosition].amount).substring(2, stashArray[currentPosition].amount.length + 1) : stashArray[currentPosition].amount}</Text>
                    <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                      <Text style={{ color: "white" }}>Click to close</Text>
                    </TouchableOpacity>
                  </Overlay>
            <View style={styles.transactionItem}>
              <Text style={styles.itemDate}>{item.date}</Text>
              <Text style={styles.itemName}>{item.name.length < 15
                  ? `${item.name}`
                  : `${item.name.substring(0, 12)}...`}</Text>
              <View style={styles.buffer}>
                <Text style={item.amount.length < 7 ? styles.itemAmountStash : styles.itemAmountStashLarge}>{item.type === "stash" && item.amount > 0 ? `$` : `-$`}{item.amount < 0 ? JSON.stringify(item.amount).substring(2, item.amount.length + 1) : item.amount}
                    </Text>
              </View>
            </View>
          </TouchableScale>
        )}
        keyExtractor={item => item.key}
        />
        </View>
        <TransactionButton
          title="      Withdraw      "
          style={{ flex: .15, position: "relative", marginTop: 15}}
          onPress={() => {
            navigation.navigate('AddTransaction')
          }}
        />
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
    width: '95%',
    alignSelf: 'center'
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