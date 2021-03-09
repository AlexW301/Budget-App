import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';


export default function MonthlyReportScreen({ route, navigation }) {
  const budgetArray = route.params
  budgetReport = budgetArray[budgetArray.length - 1]
  amountSaved = budgetReport.budget - budgetReport.spent
  let amountSavedText
  let monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  if (amountSaved > 0) {
    amountSavedText = `You saved an extra $${amountSaved} last month!`
  } else if (amountSaved === 0) {
    amountSavedText = `You were exactly on your budget last month!`
  } else if (amountSaved < 0) {
    amountSavedText = `You went $${amountSaved} over budget last month. You'll do better this month!`
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.main}}>
      <Text style={styles.reportMonth}>Report for {monthNames[budgetReport.month.substring(0,1)]}</Text>
      <Text style={styles.congratsText}>{budgetReport.spent < budgetReport.budget ? `Congratulations! You stayed within your budget last month!` : `` || ( budgetReport.spent > budgetReport.budget && budgetReport.spent - budgetReport.budget) <= (budgetReport.budget * .10) ? `Almost! You went just a little bit over last month.` : `You went over your budget last month...` }</Text>
      <Text style={styles.resultsText1}>Results!</Text>
      <Text style={styles.budgetText}>Your Budget was ${budgetReport.budget}</Text>
      <Text style={styles.spentText}>You spent ${budgetReport.spent}</Text>
      <Text style={styles.resultsText2}>{amountSavedText}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  reportMonth: {
    flex: 1,
    fontSize: 30,
    fontFamily: "Rubik_700Bold",
    color: colors.text,
  },
  congratsText: {
    flex: 1,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
    textAlign: 'center'
  },
  budgetText: {
    flex: .5,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
  },
  spentText: {
    flex: .5,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
  },
  resultsText1: {
    flex: .5,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
  },
  resultsText2: {
    flex: 1,
    fontSize: 22,
    fontFamily: "Rubik_400Regular",
    color: colors.text,
    textAlign: 'center'
  }
})
