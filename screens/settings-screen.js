import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import { Button } from "react-native";
import * as Updates from "expo-updates";
import MyBudget from "./my-budget-screen";
import { Overlay } from "react-native-elements";
import alex from "../assets/alex-profile.jpg";


export default function SettingsScreen({ route, navigation }) {
  const isFocused = useIsFocused();

  const [refresh, initRefresh] = useState(1);

  const [month, setMonth] = useState();

  const [historyMonth, setHistoryMonth] = useState();

  const [isVisible, setIsVisible] = React.useState(false);

  let monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    setMonth(month);
    setHistoryMonth(`${month}/${year}`);
  }, []);

  const resetApp = () => {
    Alert.alert(
      "WARNING: Do you wish to reset the app?",
      "Doing so will delete all of your saved data. Including your history, stash, budget, transactions, etc.. Continue only if you wish to start fresh as if downloading the app for the first time",
      [
        {
          text: "Yes, Delete!",
          onPress: () => {
            // Delete all saved data
            clearAsyncStorage();
            // Reload app to show changes
            Updates.reloadAsync();
          },
        },
        {
          text: "Cancel, Dont Reset",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const save = () => {
    Alert.alert(
      "WARNING: Do you wish to save your budget?",
      "This will clear your current transactions from your home screen and save them to the history page. Your budget is automatically saved to the history page at the begining of a new month, only use this option if you need to.",
      [
        {
          text: "Yes, Save!",
          onPress: () => {
            // Add this months transaction array to the history array
            historyArray = transactionsArray.concat(historyArray);
            //
            stashTransaction.type = "stash";
            stashTransaction.date = historyMonth;
            stashTransaction.amount = Number(currentBudget).toFixed(2);
            stashTransaction.name =
              monthNames[JSON.stringify(month).substring(0, 1)];
            historyArray.unshift(stashTransaction);
            // Empty Transaction Array
            transactionsArray = [];
            // Set current budget to budget
            currentBudget = myBudget;
            // Save changes
            saveData();
            // Show changes (fixes the bug where first stash transaction after saving monthly budget replaces the month total item in history array)
            displayData();
            // alert
            alert("Budget Saved!");
          },
        },
        {
          text: "Cancel, Dont Save",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  if (isFocused) {
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: colors.main,
      }}
    >
      <Overlay
        backdropStyle={{}}
        isVisible={isVisible}
        ModalComponent={Modal}
        onBackdropPress={() => setIsVisible(!isVisible)}
        overlayStyle={{ width: "85%", height: 600, backgroundColor: "#117864" }}
      >
        <ScrollView>
          <Text style={styles.header}>About Me</Text>
          <Image
            source={alex}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              borderRadius: 250,
              borderColor: "white",
              borderWidth: 2,
            }}
          />
          <Text style={styles.subTitle}>Alex Waller</Text>
          <Text style={styles.subSubTitle}>Developer</Text>
          <Text style={styles.body}>Hi, My name is Alex Waller</Text>
          <Text style={styles.body}>
            I am 22 years old. I started teaching myself to code back in September of 2020 by taking a complete guide to Javascript course online. I finished the course in December of that year 
            and was eager to put what I have learned to use and continue to learn.
          </Text>
          <Text style={styles.body}>
            I learned of a popular Javascript library called React Native that would allow me code native IOS and Android apps using Javascript. I thought this would be really cool way to put what I have learned to use and learn something new at the same time.
          </Text>
          <Text style={styles.body}>
            In 2021 I have 3 goals. Learn to code, save money for a house, and run a 4 hour marathon. This app was a fun way to work on two of those goals at the same time. While working on the app every morning I was learning to code. My girlfriend and I were also beta testing the app 
            as I built it and using it to keep us on budget.
          </Text>
          <Text style={styles.body}>
            I am not done working on this app and will continue to work on it and bring new features as requested. However it is now at a place I am satisfied with and excited to share with everyone. 
          </Text>
          <Text style={styles.body}>
            I hope you enjoy the app and it helps keep you on your own budget, what ever that may be! If you have any feedback on the app at all or would like to request a feature feel free to reach out to my email below and let me know.
          </Text>
          <Text style={styles.body}>
            Thank you for downloading my app!
          </Text>
          <TouchableOpacity onPress={() => {Linking.openURL('mailto:alexwaller301@gmail.com')}}>
          <Text style={styles.link}>
            alexwaller301@gmail.com
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Linking.openURL('https://venmo.com/code?user_id=2192143212871680281')}}>
          <Text style={styles.link}>
            Support the Developer
          </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Text style={{color: 'white'}}>Click to close</Text>
          </TouchableOpacity>
      </Overlay>
      <Text style={styles.header}>Settings</Text>
      <TouchableScale
        style={styles.item}
        onPress={() => {
          navigation.navigate("SetBudget");
        }}
      >
        <Text style={styles.itemText}>Set Budget</Text>
      </TouchableScale>
      <TouchableScale
        style={styles.item}
        onPress={() => {
          save();
        }}
      >
        <Text style={styles.itemText}>Save Monthly Budget</Text>
      </TouchableScale>
      <TouchableScale
        style={styles.item}
        onPress={() => {
          resetApp();
        }}
      >
        <Text style={styles.itemText}>Reset</Text>
      </TouchableScale>
      <TouchableScale
        style={styles.item}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text style={styles.itemText}>About Me</Text>
      </TouchableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    flex: 0.1,
    paddingTop: 5,
  },
  item: {
    flex: 0.07,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    width: "90%",
    marginBottom: 5,
    opacity: 1,
  },
  itemText: {
    fontSize: 25,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    opacity: 1,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    opacity: 1,
    marginTop: 15
  },
  subTitle: {
    fontSize: 25,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    opacity: 1,
    marginTop: 5,
  },
  subSubTitle: {
    fontSize: 20,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular_Italic",
    opacity: 1,
  },
  link: {
    fontSize: 17,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_700Bold",
    opacity: 1,
    marginTop: 15,
  },
});
