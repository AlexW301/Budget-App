import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import {StackActions} from '@react-navigation/native'; 


export default function LoadingScreen({navigation}) {
    displayData();
    displayBudgetsArray();
    displayMonthlyReport();
    useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      
      global.currentMonthOnLoad = `${month}/${year}`
      //alert(currentMonthOnLoad)
    }, []);
      setTimeout(() => {
        //alert(`#2${myBudget}`)
        // Replaces LoadingScreen with MyBudget screen on the stack
        if (myBudget == 0 || myBudget == null) {
          // Navigates to set budget screen
          navigation.navigate('SetBudget')
          // Replaces loading screen from the stack with My Budget Screen
          navigation.dispatch(
            StackActions.replace('MyBudget'))
        } else {
          navigation.dispatch(
            StackActions.replace('MyBudget'))
        }
      }, 1000)
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.main}}>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}></Text>
        </View>
      )
}
