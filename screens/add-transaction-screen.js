import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
  Image,
  ScrollView
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import TransactionButton from "../components/transaction-button";
import {
  Overlay
} from "react-native-elements";
import icon from '../assets/adaptive-icon.png'
import alex from '../assets/alex-profile.jpg'
import { Camera, Permissions } from 'expo-camera';
import FaceCamera from '../components/Camera';

global.colors = {
  main: "#0E6251",
  text: "#E8F8F5",
  shade1: "#117864",
};

export default function AddTransaction({ navigation }) {
  const isFocused = useIsFocused();
  const [description, updateDescription] = useState("");
  const [amount, updateAmount] = useState();
  const [currentDate, setCurrentDate] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(month + "/" + date + "/" + year);

    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds

  if (isFocused) {
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", backgroundColor: colors.main }}
    >
      <Overlay
      backdropStyle={{}}
      isVisible={isVisible}
      ModalComponent={Modal}
      onBackdropPress={() => setIsVisible(!isVisible)}
      overlayStyle={{width: '85%', height: 600, backgroundColor: "#117864"}}
    >
      
      <Text style={styles.header}>YA FACE!</Text>
      <FaceCamera />
    </Overlay>
      <TouchableOpacity onPress={() => {Keyboard.dismiss()}} activeOpacity={1} style={{ alignItems: "center" }}>
      <View style={{ position: "relative", bottom: "0%", flex: .6, paddingTop: 10}}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            fontFamily: "Rubik_400Regular",
            color: colors.text,
          }}
        >
          Add A Transaction
        </Text>
        <Text
          style={{
            justifyContent: "center",
            position: "relative",
            textAlign: "center",
            fontFamily: "Rubik_400Regular_Italic",
            color: colors.text,
            fontSize: 18,
          }}
        >
          Your Current Balance is ${Number(currentBudget).toFixed(2)}
        </Text>
      </View>
      <View style={{ position: "relative", flex: 3 }}>
        <Text
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: 20,
            fontFamily: "Rubik_400Regular",
            color: colors.text,
            flex: .4
          }}
        >
          New Transaction
        </Text>
        <TextInput
          id="descriptionInput"
          style={{
            position: "relative",
            width: 330,
            fontSize: 15,
            borderColor: "gray",
            borderWidth: 2,
            top: "-4%",
            color: colors.text,
            borderRadius: 50,
            paddingStart: 10,
            height: 45,
            flex: .25,
            alignSelf: 'center'
          }}
          placeholder=" Description"
          placeholderTextColor={colors.text}
          onChangeText={(value) => {
            updateDescription(value);
            transaction.name = value;
          }}
          value={description}
        />
        <TextInput
          style={{
            position: "relative",
            width: 330,
            fontSize: 15,
            borderColor: "gray",
            borderWidth: 2,
            color: colors.text,
            borderRadius: 50,
            paddingStart: 10,
            height: 45,
            flex: .25,
            marginBottom: 15,
            alignSelf: 'center'
          }}
          keyboardType="numeric"
          placeholder=" Amount"
          placeholderTextColor={colors.text}
          onChangeText={(value) => {
            updateAmount(value);
            transaction.amount = value;
          }}
          value={amount}
        />
        <TransactionButton
          title="Expense"
          style={{ flex: 1, position: "relative", flex: .4 }}
          onPress={() => {
            Keyboard.dismiss();
            createTransaction = true;
            transaction.type = "expense";
            transaction.name = transaction.name;
            transaction.date = currentDate;
            transaction.amount = Number(transaction.amount).toFixed(2);
            if (transaction.name === 'Ya face' || transaction.name === 'ya face' || transaction.name === 'Ya Face' ) {
              setIsVisible(true)
            }
            if (transaction.name && transaction.amount && transaction.name != 'Ya face' && transaction.name != 'ya face' && transaction.name != 'Ya Face') {
              navigation.navigate("MyBudget", transaction);
            }
            updateDescription("");
            updateAmount();
          }}
        />
        <View style={{ flex: 1, position: "relative", flex: 2, flexDirection: 'row' }}>
        <View style={{ flex: 1, position: "relative", marginHorizontal: 5 }}>  
        <TransactionButton
          title="STASH"
          style={{ position: "relative", flex: 1 }}
          onPress={() => {
            Keyboard.dismiss();
            createTransaction = true;
            stashTransaction.type = "stash";
            stashTransaction.date = currentDate;
            stashTransaction.amount = Number(transaction.amount).toFixed(2);
            stashTransaction.name = transaction.name;
            stashTotal = stashTotal + parseFloat(transaction.amount)
            if (transaction.name && transaction.amount) {
              navigation.goBack();
              navigation.navigate("StashScreen");
            }
            updateDescription("");
            updateAmount();
          }}
        />
        </View>
        <View style={{ flex: 1, position: "relative", marginHorizontal: 5 }}>  
        <TransactionButton
          title="Withdraw"
          style={{ flex: 1, position: "relative"}}
          onPress={() => {
            Keyboard.dismiss();
            createTransaction = true;
            stashTransaction.type = "withdraw";
            stashTransaction.date = currentDate;
            stashTransaction.amount = Number(transaction.amount).toFixed(2);
            stashTransaction.name = transaction.name;
            stashTotal = stashTotal - parseFloat(transaction.amount)
            if (transaction.name && transaction.amount) {
              navigation.goBack();
              navigation.navigate("StashScreen", stashTransaction);
            }
            updateDescription("");
            updateAmount();
          }}
        />
        </View>
        </View>
        
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  transactionInput: {
    position: "relative",
    width: 330,
    fontSize: 15,
    borderColor: "gray",
    borderWidth: 2,
    top: "0%",
  },
  addBtn: {
    top: 280,
  },

  expenseBtn: {
    maxWidth: 150,
  },

  depositBtn: {
    maxWidth: 150,
    left: 160,
    bottom: 37,
  },

  transactionType: {
    top: 30,
  },
  header: {
    fontSize: 35,
    textAlign: "center",
    color: colors.text,
    fontFamily: "Rubik_400Regular",
    flex: 0.1,
    paddingTop: 5,
  },
});

/* OLD DEPOSIT BUTTON incase I need it again
<TransactionButton
          title="Deposit"
          style={{ flex: 1, position: "relative", bottom: "30%" }}
          onPress={() => {
            Keyboard.dismiss();
            createTransaction = true;
            transaction.type = "deposit";
            transaction.date = currentDate;
            transaction.amount = Number(transaction.amount).toFixed(2);
            if (transaction.name && transaction.amount) {
              navigation.navigate("MyBudget", transaction);
            }
            stashTotal = stashTotal + parseFloat(transaction.amount)
            updateDescription("");
            updateAmount();
          }}
        />
*/