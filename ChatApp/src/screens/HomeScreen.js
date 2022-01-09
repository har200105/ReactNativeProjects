import React, { useState , useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text , Image , FlatList,StyleSheet,TouchableOpacity } from 'react-native';
import {FAB} from 'react-native-paper';
export default function HomeScreen({user,navigation}) {
    const [usersall,setUsersall] = useState(null);
    const getUsers = async () =>{
        const snapshot = await firestore().collection('user').where('uid','!=',user.uid).get();
       const users = snapshot.docs.map(docSnap=>docSnap.data());
       console.log(users);
       setUsersall(users);
    }

    useEffect(()=>{
        getUsers();
    },[])

    const RenderCard = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>navigation.navigate("Chat",{name:item.name,uid:item.uid,
                status: typeof(item.status)=="string" ? item.status : `Last Seen :${(Math.ceil((Date.now() - item.status.toDate())/60000)).toString()} minutes ago`})}>
            <View style={styles.userCard}>
               <Image source={{uri:item.pic}} 
               style={styles.image}/>
               <View >

                   <Text style={styles.text}>
                     {item.name}
                   </Text>

                   <Text style={styles.text}>
                     {item.email}
                   </Text>
               </View>
            </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{
            flex:1
        }}>
           <FlatList  
           data={usersall}
           renderItem={({item})=> {return <RenderCard item={item} /> }}
           keyExtractor={(item)=>item.uid}
            />
            <FAB
            style={styles.fab}
            icon="face-profile"
            color="purple"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
    )
}


const styles = StyleSheet.create({
    image:{
        width:60,height:60,borderRadius:30,backgroundColor:"blue"
},
  text:{
       fontSize:18,
       marginLeft:15,
   },
userCard:{
    flexDirection:"row",
    margin:3,
    padding:4,
    backgroundColor:"white",
    borderBottomColor:"grey",
    borderBottomWidth:1,
},
fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:"orange"
  },
  });
  