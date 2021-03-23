import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { BackHandler, View, StyleSheet, Button } from "react-native";
import { NavigationContainer, useLinkProps } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SetBudget from "./screens/set-budget-screen";
import MyBudget from "./screens/my-budget-screen";
import AddTransaction from "./screens/add-transaction-screen";
import LoadingScreen from "./screens/loading-screen";
import StashScreen from "./screens/stash-screen";
import Icon from 'react-native-vector-icons/Ionicons'; 
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
import StashButton from "./components/stash-button";
import Header from './components/header';
import { ActivityIndicator } from "react-native";

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
global.stashTransaction = {
  name: "",
  amount: 0,
  type: "",
  key: "",
  date: "",
};
global.stashArray = [];
global.stashTotal = 0

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
    const navigateToStashScreen = () => {
      navigation.navigate('StashScreen')
    }
    return (
      <Stack.Navigator
        initialRouteName="LoadingScreen"
        HeaderTitle="My Budget Screen"
      >
        <Stack.Screen
          name="MyBudget"
          component={MyBudget}
          options={{
            headerTitle: () => 
                <Header title="Home" navigation={navigation}/>,
            headerLeft: null,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerRight: () => (
              <StashButton title="$" style={{marginRight: 20}} onPress={navigateToStashScreen}></StashButton>
            )
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
        <Stack.Screen
          name="StashScreen"
          component={StashScreen}
          options={{
            title: "The Stash",
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

function AddTransactionScreen({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="AddTransaction"
      HeaderTitle="Add Transaction"
    >
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          headerTitle: () => 
                <Header title="Add Transaction" navigation={navigation}/>,
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Stack.Navigator>
  );
}

function SetBudgetScreen({ navigation, route }) {
    return (
      <Stack.Navigator
        initialRouteName="SetBudget"
        HeaderTitle="Set My Budget"
      >
        <Stack.Screen
          name="SetBudget"
          component={SetBudget}
          options={{
            headerTitle: () => 
                <Header title="Set My Budget" navigation={navigation}/>,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }

  function StashScreen2({ navigation, route }) {
    return (
      <Stack.Navigator
        initialRouteName="StashScreen"
        HeaderTitle="Stash"
      >
        <Stack.Screen
          name="SetBudget"
          component={StashScreen}
          options={{
            headerTitle: () => 
                <Header title="STASH" navigation={navigation}/>,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }

function TabScreens() {
  return (
    <Tab.Navigator
        initialRouteName="MyBudget"
        tabBarOptions={{
          activeTintColor: colors.text,
          inactiveTintColor: colors.text,
          activeBackgroundColor: "#117864",
          inactiveBackgroundColor: "#148F77",
          showLabel: false
        }}
      >
        <Tab.Screen
          name="MyBudget"
          component={HomeScreen}
          options={{ title: "My Budget", tabBarVisible: true,  tabBarIcon:()=>(  
            <Icon name="wallet-outline" color='#E8F8F5' size={40}/>  
        )  
      }  }
        />
        <Tab.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{ title: "Add Transaction", tabBarIcon:()=>(  
            <Icon name="card-outline" color='#E8F8F5' size={40}/>  
        )  
       }}
        />
      </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator HeaderTitle="My Budget Screen" drawerType="slide" drawerStyle={{
    backgroundColor: "#117864",
    width: 200,
  }} drawerContentOptions={{
    activeTintColor: '#E8F8F5',
    activeBackgroundColor: '#0B5345',
    inactiveTintColor: '#E8F8F5',
    inactiveBackgroundColor: '#148F77',
    labelStyle:{
      marginLeft:5
    }
  }}>
      <Drawer.Screen name="Home" component={TabScreens} />
      <Drawer.Screen name="SetBudget" component={SetBudgetScreen} options={{
            title: "Set My Budget"
          }} />
      <Drawer.Screen name="StashScreen" component={StashScreen2} options={{
            title: "Stash"
          }} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

// LOCAL STORAGE AND SAVING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DELETE budgetsByMonth ////////////// old variable, not using it
global.saveData = () => {
  let myBudgetSave = myBudget;
  let currentBudgetSave = JSON.stringify(currentBudget);

  let stashTotalSave = JSON.stringify(stashTotal);
  let stashArraySave = JSON.stringify(stashArray);

  AsyncStorage.setItem("myBudget", myBudgetSave);
  AsyncStorage.setItem("currentBudget", currentBudgetSave);
  AsyncStorage.setItem("transactionsArray", JSON.stringify(transactionsArray));
  //AsyncStorage.setItem("budgetsByMonth", JSON.stringify(budgetsByMonth));

  AsyncStorage.setItem("stashTotal", stashTotalSave);
  AsyncStorage.setItem("stashArray", stashArraySave);
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
    let stashTotalSave = await AsyncStorage.getItem("stashTotal");
    let stashArraySave = await AsyncStorage.getItem("stashArray");

    myBudget = myBudgetSave;
    currentBudget = JSON.parse(currentBudgetSave);

    stashTotal = JSON.parse(stashTotalSave);
    stashArray = JSON.parse(stashArraySave);

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
