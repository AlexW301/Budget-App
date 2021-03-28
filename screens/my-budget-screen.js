import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AddTransaction from "./add-transaction-screen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

/*
global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};
*/
global.monthsBudgeted = ["init"];


export default function MyBudget({ navigation }) {
  const [visible, setVisible] = useState(false);

  const [refresh, initRefresh] = useState(1);

  const [currentDate, setCurrentDate] = useState("");

  const [daysLeft, setDaysLeft] = useState();

  let monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  // Dont need current month anymore using currentMonthOnLoad from loading screen
  const [currentMonth, setCurrentMonth] = useState();

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    setCurrentDate(date);
    // Dont need current month anymore using currentMonthOnLoad from loading screen
    setCurrentMonth(`${month}/${year}`);
    setDaysLeft(daysInMonth[month - 1] - date);
    displayBudgetsArray();
    if (monthsBudgeted.length === 1) {
      monthsBudgeted.unshift(currentMonthOnLoad);
    }
    if (monthsBudgeted.indexOf(currentMonthOnLoad) === -1) {
      //Add Current Month to monthsBudgeted array, so that this does not run again this month until next month
      monthsBudgeted.unshift(currentMonthOnLoad);
      //alert(`Months Budgeted ${monthsBudgeted}`)
      // Get Last Months info/year
      let lastMonth = `${month - 1}/${(month = 0 ? year - 1 : year)}`;
      // Create Object containing all budget data from last month
      var budgetData = {
        month: lastMonth,
        budget: myBudget,
        spent: myBudget - currentBudget,
        transactions: transactionsArray,
      };
      // Push last months data object to the global month budget array
      budgetsArray.push(budgetData);
      // Add this months transaction array to the history array
      historyArray = transactionsArray.concat(historyArray)
      // Add extra saved money to stash transaction
            createTransaction = true;
            stashTransaction.type = "stash";
            stashTransaction.date = lastMonth;
            stashTransaction.amount = Number(budgetData.budget - budgetData.spent).toFixed(2);
            stashTransaction.name = monthNames[lastMonth.substring(0,1)];
            stashTotal = stashTotal + parseFloat(stashTransaction.amount);
      //push stash transaction to stash array and update stash total
      if (createTransaction && stashTransaction.type === "stash") {
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
      // Save Budget Data to local storage
      saveBudgetsArray();
      // Clear Current Budget and Array
      transactionsArray = [];
      currentBudget = myBudget;
      saveData();
      // Navigate to new screen showing last months spending
      navigation.navigate("MonthlyReportScreen", budgetsArray);
      // Reset
    }
  }, []);

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
      if (transaction.type === "deposit") {
        currentBudget =
          parseFloat(currentBudget) + parseFloat(transaction.amount);
      } else if (transaction.type === "expense") {
        currentBudget =
          parseFloat(currentBudget) - parseFloat(transaction.amount);
      }
      // SAVE current budget
      saveData();
      // Clear transaction variable
      transaction = {
        name: "",
        amount: 0,
        type: "expense",
        key: "",
      };
      createTransaction = false;
    }
  }
  if (transactionsArray.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: colors.main,
        }}
      >
        <TouchableScale
          activeScale={0.9}
          style={{
            position: "relative",
            width: "100%",
            paddingTop: 5
          }}
          onLongPress={() => {
            navigation.navigate("SetBudget");
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: colors.text,
              fontFamily: "Rubik_400Regular",
            }}
          >
            Your Budget is ${myBudget}
          </Text>
        </TouchableScale>
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
          you have {daysLeft} days left...
        </Text>
        <Text
          style={{
            alignContent: "center",
            justifyContent: "center",
            position: "relative",
            fontSize: 50,
            fontFamily: "Rubik_700Bold",
            color: colors.text,
          }}
        >
          ${Number(currentBudget).toFixed(2)}
        </Text>
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
              textAlign: 'center'
            }} >it's empty here...</Text>
          </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: colors.main,
        }}
      >
        <TouchableScale
          activeScale={0.9}
          style={{
            position: "relative",
            width: "100%",
            paddingTop: 5
          }}
          onLongPress={() => {
            navigation.navigate("SetBudget");
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: colors.text,
              fontFamily: "Rubik_400Regular",
            }}
          >
            Your Budget is ${myBudget}
          </Text>
        </TouchableScale>
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
          you have {daysLeft} days left...
        </Text>
        <Text
          style={{
            alignContent: "center",
            justifyContent: "center",
            position: "relative",
            fontSize: 50,
            fontFamily: "Rubik_700Bold",
            color: colors.text,
          }}
        >
          ${Number(currentBudget).toFixed(2)}
        </Text>
        <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: colors.main}}>
          <FlatList
            style={styles.flatList}
            data={transactionsArray}
            renderItem={({ item }) =>
              item.type === "expense" ? (
                // EXPENSE ITEM
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
                              transactionsArray
                                .map(function (e) {
                                  return e.key;
                                })
                                .indexOf(item.key)
                            );
                            if (item.type === "expense") {
                              currentBudget =
                                parseFloat(currentBudget) +
                                parseFloat(item.amount);
                            } else if (item.type === "deposit") {
                              currentBudget =
                                parseFloat(currentBudget) -
                                parseFloat(item.amount);
                            }
  
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
                      <Text style={ item.amount.length < 7 ? styles.itemAmountExpense : styles.itemAmountExpenseLarge} >
                        -${item.amount}
                          </Text>
                    </View>
                  </View>
                </TouchableScale>
              ) : (
                // DEPOSIT ITEM
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
                              transactionsArray
                                .map(function (e) {
                                  return e.key;
                                })
                                .indexOf(item.key)
                            );
                            if (item.type === "expense") {
                              currentBudget =
                                parseFloat(currentBudget) +
                                parseFloat(item.amount);
                            } else if (item.type === "deposit") {
                              currentBudget =
                                parseFloat(currentBudget) -
                                parseFloat(item.amount);
                            }
  
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
                    <Text style={styles.itemName}>
                      {item.name.length < 15
                        ? `${item.name}`
                        : `${item.name.substring(0, 12)}...`}
                    </Text>
                    <View style={styles.buffer}>
                      <Text style={item.amount.length < 6 ? styles.itemAmountDeposit : styles.itemAmountDepositLarge}>{
                          item.amount.length < 7
                          ? `$${item.amount}`
                          : `$${item.amount.substring(0, item.amount.length - 3).substring(0, item.amount.length - 6)},${item.amount.substring(item.amount.length - 6, item.amount.length - 3)}`
                      }</Text>
                    </View>
                  </View>
                </TouchableScale>
              )
            }
          />
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonView: {
    top: -10,
  },

  flatList: {
    maxWidth: "95%",
    width: 375,
    flex: 1,
    maxHeight: '100%',
  },

  itemName: {
    alignContent: "center",
    textAlign: 'left',
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

  itemAmountDeposit: {
    alignContent: "center",
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 30,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 25,
    marginLeft: 13
  },

  itemAmountDepositLarge: {
    alignContent: "center",
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 25,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 25,
    marginLeft: 0
  },

  itemAmountExpense: {
    alignContent: "center",
    textAlign: 'right',
    marginTop: 10,
    fontSize: 30,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 25,
    //backgroundColor: 'blue',
    left: -235,
  },

  itemAmountExpenseLarge: {
    alignContent: "center",
    textAlign: 'right',
    marginTop: 10,
    fontSize: 25,
    color: colors.text,
    fontFamily: "Rubik_500Medium",
    bottom: 25,
    //backgroundColor: 'blue',
    left: -235,
  },

  buffer: {
    bottom: 40,
    left: 228,
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
});




// OLD Logic for transaction amount displayed on transaction item
/*
{
                        item.amount.length < 7
                        ? `-$${item.amount}`
                        : `-$${item.amount.substring(0, item.amount.length - 3).substring(0, item.amount.length - 6)},${item.amount.substring(item.amount.length - 6, item.amount.length - 3)}`
                    }
*/