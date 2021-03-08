import React from 'react';
import { View, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';


export default function MonthlyReportScreen({ route, navigation }) {
  const budgetArray = route.params
  budgetReport = budgetArray[budgetArray.length - 1]
  amountSaved = budgetReport.budget - budgetReport.spent
  let amountSavedText

  if (amountSaved > 0) {
    amountSavedText = `Congrats you saved $${amountSaved} last month!`
  } else if (amountSaved === 0) {
    amountSavedText = `Congrats you were right on budget last month!`
  } else if (amountSaved < 0) {
    amountSavedText = `You went $${amountSaved} over budget last month. Better luck this month!`
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.main}}>
      <Text style={{flex: 1 }}>{budgetReport.spent < budgetReport.budget ? `Good Job!` : ``}{( budgetReport.spent > budgetReport.budget && budgetReport.spent - budgetReport.budget) <= (budgetReport.budget * .10) ? `Good Job! You Were close` : ``}</Text>
      <Text style={{flex: 1 }}>Last Month | {budgetReport.month}</Text>
      <Text style={{flex: 1 }}>Your Budget was ${budgetReport.budget}</Text>
      <Text style={{flex: 1 }}>You spent ${budgetReport.spent}</Text>
      <Text style={{flex: 1 }}>{amountSavedText}</Text>
    </View>
  )
}
