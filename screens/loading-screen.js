import React from 'react';
import { View, Text } from 'react-native';
import {StackActions} from '@react-navigation/native'; 


export default function LoadingScreen({navigation}) {
    displayData();
    displayBudgetsArray();
      setTimeout(() => {
        // Replaces LoadingScreen with MyBudget screen on the stack
        if (myBudget == null) {
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
        <View>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>loading</Text>
        </View>
      )
}
