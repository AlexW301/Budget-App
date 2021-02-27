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
    <View>
      <Text style={{ position: 'relative', justifyContent: 'center', textAlign: 'center', marginBottom: 30, marginTop: 20 }}>This screen is currently a work in progress!</Text>
      <Text style={{ position: 'relative', justifyContent: 'center', textAlign: 'center', paddingHorizontal: 10, marginBottom: 20 }}>When it is done, at the begining of a new month it will show and save information about your last month of spending. Eventually you will also be able to go back and view a history of all previous months spending at anytime.</Text>
      <Text style={{ position: 'relative', justifyContent: 'center', textAlign: 'center' }}>Last Month | {budgetReport.month}</Text>
      <Text style={{ position: 'relative', justifyContent: 'center', textAlign: 'center' }}>Your Budget was ${budgetReport.budget}</Text>
      <Text style={{ position: 'relative', justifyContent: 'center', textAlign: 'center' }}>You spent ${budgetReport.spent}</Text>
      <Text style={{ position: 'relative', justifyContent: 'center', textAlign: 'center' }}>{amountSavedText}</Text>
    </View>
  )
}
