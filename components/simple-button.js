import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function SimpleButton({title, onPress}) {

    return (
        <View style={{flex: 1, position: 'relative', justifyContent: 'center'}}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderColor: 'black',
        borderWidth: 2,
        width: 130,
        height: 50,
        backgroundColor: colors.text
    },

    buttonText: {
        position: 'relative',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#464646'
    }
})