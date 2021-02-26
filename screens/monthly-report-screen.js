import React from 'react';
import { View, Text } from 'react-native';
import {StackActions} from '@react-navigation/native'; 


export default function MonthlyReportScreen({ route, navigation}) {
        const budgetArray = route.params
        budgetReport = budgetArray[budgetArray.length - 1]
        amountSaved = budgetReport.budget - budgetReport.spent
        let amountSavedText

        if(amountSaved > 0) {
          amountSavedText = `Congrats you saved $${amountSaved} last month!`
        } else if(amountSaved === 0) {
          amountSavedText = `Congrats you were right on budget last month!`
        } else if (amountSaved < 0) {
          amountSavedText = `You went $${amountSaved} over budget last month. Better luck this month!`
        }
      return (
        <View>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>Last Month | {budgetReport.month}</Text>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>Your Budget was ${budgetReport.budget}</Text>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>You spent ${budgetReport.spent}</Text>
          <Text style={{position: 'relative', justifyContent: 'center', textAlign: 'center'}}>{amountSavedText}</Text>
        </View>
      )
}
