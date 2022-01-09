import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.banner}>Social</Text>
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Image
                      source={{
                          uri:""
                      }}
                      style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    container:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        marginHorizontal:20
    },

    iconsContainer:{
        flexDirection:"row"
    },

    logo:{
        width:100,
        height:50,
        resizeMode:"contain"
    },
    icon:{
        width:30,
        height:30,
        marginLeft:10,
        resizeMode:"contain"
    }
});

export default Header
