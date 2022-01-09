import React, { useEffect, useState } from 'react'
import { View, Text ,ActivityIndicator,Image,StyleSheet} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-paper';


export default function ProfileScreen({user}) {
    const [profile,setProfile] = useState("");


   

    useEffect(()=>{
        firestore().collection('user').doc(user.uid).get().then(docSnap=>{
            setProfile(docSnap.data());
        })    
    },[])

    if(!profile){
        return <ActivityIndicator size="large" color="blue"/>
      }
      


    return (  
        <View style={styles.container}>
            <Image style={styles.image} source = {{uri:profile.pic}}/>
            <Text  style={styles.text}>Name :{profile.name}</Text>
            <View style={{
                flexDirection:"row"
            }}>
                <Feather name="mail" size={30} color="white"/>
                <Text style={styles.text}>Email :{profile.email}</Text>
            </View>
            <Button style={styles.btn} mode="contained" onPress={()=>{
                firestore().collection('user').doc(user.uid).update({
                    status:firestore.FieldValue.serverTimestamp()
                  }).then(()=>{
                    auth().signOut()
                  })
            }}>Logout</Button>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"azure",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    image:{
        height:200,
        width:200,
        borderRadius:100,
        borderWidth:3,
        borderColor:"white"
    },
    text:{
        fontSize:23,
        color:"blue",
        fontWeight:"bold"
    },
    btn:{
        borderColor:"white",
        borderWidth:3
    }
})