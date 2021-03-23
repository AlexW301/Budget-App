import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Header({title, navigation}) {

    const openMenu = () => {
        navigation.openDrawer();
    }
 
    return (
        <View style={styles.iconView}>
            <Icon name="menu" color='#E8F8F5' size={30} onPress={openMenu} style={styles.icon}/>        
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: colors.text,
        fontSize: 25,
        fontFamily: "Rubik_400Regular",
    },
    iconView: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        flexDirection: 'row',
    }
})