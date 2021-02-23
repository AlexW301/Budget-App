import React from 'react';
import { View, Text } from 'react-native';
import {StackActions} from '@react-navigation/native'; 


export default function MonthlyReportScreen({ route, navigation}) {
        const budgetData = route.params
      return (
        <View>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>{JSON.stringify(budgetsArray[budgetsArray.length])}</Text>
        </View>
      )
}
