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
            
                <Text style={styles.headerText}>{title}</Text>
            
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
    },

    headerText: {
        color: colors.text,
        fontSize: 20,
        fontFamily: "Rubik_500Medium_Italic",
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 10
        //backgroundColor: 'blue',

    },
    iconView: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'green'
    },
    icon: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

/*
<View style={styles.iconView}>
            <Icon name="menu" color='#E8F8F5' size={30} onPress={openMenu} style={styles.icon}/>        
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
        </View>
*/