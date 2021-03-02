import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import {StackActions} from '@react-navigation/native'; 


export default function LoadingScreen({navigation}) {
    displayData();
    displayBudgetsArray();
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
        // Replaces LoadingScreen with MyBudget screen on the stack
        if (myBudget == 0 || myBudget == null) {
          navigation.dispatch(
            StackActions.replace('SetBudget'))
          // navigation.navigate('MyBudget')
        } else {
          navigation.dispatch(
            StackActions.replace('MyBudget'))
          // navigation.navigate('MyBudget')
        }
      }, 200)
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.main}}>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}></Text>
        </View>
      )
}
