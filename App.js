import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { BackHandler, View, StyleSheet, Button } from "react-native";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SetBudget from "./screens/set-budget-screen";
import MyBudget from "./screens/my-budget-screen";
import AddTransaction from "./screens/add-transaction-screen";
import LoadingScreen from "./screens/loading-screen";
import { useEffect } from "react";
import {
  useFonts,
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import AppLoading from "expo";
import MonthlyReportScreen from "./screens/monthly-report-screen";

// GLOBAL VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

global.shortid = require("shortid");
global.currentBudget = 0;
global.myBudget = "0";
global.transaction = {
  name: "",
  amount: 0,
  type: "expense",
  key: "",
  date: "",
};
global.createTransaction = false;
global.transactionsArray = [];

global.recreatedTransactionsArray = [];
//global.budgetsByMonth = [];

global.budgetsArray = [];

global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};

global.firstDayOfMonth = true;
// NAVIGATION STACK ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Stack = createStackNavigator();

function HomeScreen({ navigation, route }) {
  {
    return (
      <Stack.Navigator
        initialRouteName="LoadingScreen"
        HeaderTitle="My Budget Screen"
      >
        <Stack.Screen
          name="MyBudget"
          component={MyBudget}
          options={{
            title: "My Budget",
            headerLeft: null,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="SetBudget"
          component={SetBudget}
          options={{
            title: "Set My Budget",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ title: "Loading Screen", headerShown: false }}
        />
        <Stack.Screen
          name="MonthlyReportScreen"
          component={MonthlyReportScreen}
          options={{
            title: "Monthly Report",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </Stack.Navigator>
    );
  }
}

function AddTransactionScreen() {
  return (
    <Stack.Navigator
      initialRouteName="AddTransaction"
      HeaderTitle="Add Transaction"
    >
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          title: "Add Transaction",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Stack.Navigator>
  );
}

function SetBudgetScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Set My Budget"
      HeaderTitle="Set My Budget"
    >
      <Stack.Screen
        name="SetBudget"
        component={SetBudget}
        options={{
          title: "Set My Budget",
          headerLeft: null,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
    Rubik_500Medium_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic,
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="MyBudget"
        tabBarOptions={{
          activeTintColor: colors.text,
          inactiveTintColor: colors.text,
          activeBackgroundColor: "#117864",
          inactiveBackgroundColor: "#148F77",
        }}
      >
        <Tab.Screen
          name="MyBudget"
          component={HomeScreen}
          options={{ title: "My Budget", tabBarVisible: true }}
        />
        <Tab.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{ title: "Add Transaction" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// LOCAL STORAGE AND SAVING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DELETE budgetsByMonth ////////////// old variable, not using it
global.saveData = () => {
  let myBudgetSave = myBudget;
  let currentBudgetSave = JSON.stringify(currentBudget);

  AsyncStorage.setItem("myBudget", myBudgetSave);
  AsyncStorage.setItem("currentBudget", currentBudgetSave);
  AsyncStorage.setItem("transactionsArray", JSON.stringify(transactionsArray));
  //AsyncStorage.setItem("budgetsByMonth", JSON.stringify(budgetsByMonth));
};

global.saveBudgetsArray = () => {
  AsyncStorage.setItem("budgetsArray", JSON.stringify(budgetsArray));
  AsyncStorage.setItem("monthsBudgeted", JSON.stringify(monthsBudgeted));
};

global.displayBudgetsArray = async () => {
  let budgetsArraySave = await AsyncStorage.getItem("budgetsArray");
  let monthsBudgetedSave = await AsyncStorage.getItem("monthsBudgeted");
  budgetsArray = JSON.parse(budgetsArraySave);
  monthsBudgeted = JSON.parse(monthsBudgetedSave);
};

global.displayData = async () => {
  try {
    let myBudgetSave = await AsyncStorage.getItem("myBudget");
    let currentBudgetSave = await AsyncStorage.getItem("currentBudget");
    let transactionsArraySave = await AsyncStorage.getItem("transactionsArray");
    //let budgetsByMonthSave = await AsyncStorage.getItem("budgetsByMonth");
    //budgetsByMonth = budgetsByMonthSave;
    //alert(budgetsByMonth)
    myBudget = myBudgetSave;
    currentBudget = JSON.parse(currentBudgetSave);
    let transactionsArrayParsed = JSON.parse(transactionsArraySave);

    if (transactionsArray !== null) {
      for (var i = 0; i < transactionsArrayParsed.length; i++) {
        let newTransaction = {
          name: transactionsArrayParsed[i].name,
          amount: transactionsArrayParsed[i].amount,
          type: transactionsArrayParsed[i].type,
          key: transactionsArrayParsed[i].key,
          date: transactionsArrayParsed[i].date,
        };
        recreatedTransactionsArray.push(newTransaction);
      }
      transactionsArray = recreatedTransactionsArray;
    }
  } catch (error) {
    //alert(error);
  }
};

global.clearAsyncStorage = async () => {
  AsyncStorage.clear();
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.shade1,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 25,
    fontFamily: "Rubik_400Regular",
  },
});
saveBudgetsArray();
displayBudgetsArray();

//clearAsyncStorage();
