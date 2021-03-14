import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StackActions } from '@react-navigation/native';
import TransactionButton from '../components/transaction-button'
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";


export default function StashScreen({ route, navigation }) {
    const isFocused = useIsFocused();

  if (isFocused === false) {
      
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: colors.main}}>
      <Text>Stash Screen</Text>
      <Text>{stashTotal}</Text>
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
                    stashTotal = stashTotal - item.amount

                    transactionsArray.splice(pos, 1);
                    saveData();
                    initRefresh(refresh + 1);
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
              <Text style={styles.itemAmountStash}>{item.amount}
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
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
    left: 15,
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
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 30,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 70,
    marginLeft: 203
  },
})