import { StatusBar } from 'expo-status-bar';  
import React,{useState,useEffect} from 'react';
import { Card,TextInput,Button} from 'react-native-paper';
// import {LinearGradient} from 'expo';
import AppBar from './appbar';
import { StyleSheet, Text, View} from 'react-native';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

export default function HomeScreen() {



const[text,setText] = useState("Biratnagar");  
const[city,setCity] = useState("Biratnagar");


//   useEffect(()=>{
//     getWeather();
// },[]);   


    const[weath,setWeath] = useState({});
    // const[all,setAll] = useState({});
    const apikey = "6c800c7b1e0afdec3e647f2f8f1efe51";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${apikey}`;
    
    const getWeather=async()=>{

        const result = await fetch(url);
            const res = await result.json();
            setWeath(res.main);
            setCity(text);
            // setAll(res);
            // console.log(res.main);
    }

 

    // if(navigation.getParams('City')){
    //   getWeather();
    // }

    // if(route.params){
    //   getWeather();
    // }
  return (
    <View style={styles.container}>
    <AppBar title="Current Weather"/>
    <TextInput
       style={{margin:10,padding:10}}
      label="City"
      value={text}
      onChangeText={text =>setText(text)}
    />
    <Button style={{margin:20}}   onPress={()=>getWeather()}>Search</Button>
    <Card style={{margin:20 , height:300}}>
    <View style={{padding:20}}>
        <Text style={styles.text}>{city}</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Temprature :{weath.temp_min}°C</Text>
        <Text style={styles.text}>Humidity :{weath.humidity}</Text>
    </View>
    </Card>
      <StatusBar style="auto" />
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    textAlign:"center",
    marginBottom:10,
    fontSize:20
  }
});
