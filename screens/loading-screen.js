import React from 'react';
import { View, Text } from 'react-native';
import {StackActions} from '@react-navigation/native'; 


export default function LoadingScreen({navigation}) {
    displayData();
      setTimeout(() => {
        // Replaces LoadingScreen with MyBudget screen on the stack
        navigation.dispatch(
          StackActions.replace('MyBudget')
        )
        // navigation.navigate('MyBudget')
      }, 200)
      return (
        <View>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>hsdffds</Text>
        </View>
      )
}
