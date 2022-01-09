import React, { useState } from 'react';
import { View, Text, Image, StyleSheet,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  if(loading){
    return <ActivityIndicator size="large" color="blue"/>
  }
  
  const userSignIn = async() =>{
    setLoading(true);
   
    if(!email || !password){
      alert("Please Add All The Fields");
      return;
    }
    try{
    const res = await auth().signInWithEmailAndPassword(email,password);
    console.log("succedd");
    setLoading(false);
  }catch(e){
    
  }

 

  }
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box}>
        <Text style={styles.text}> Welcome to The Chat App By Harshit Rathi</Text>
      </View>

      <View style={styles.box2}>
          <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          mode="outlined"
        />

        <Button mode="contained"  onPress={()=>userSignIn()}>Log In</Button>

       <TouchableOpacity onPress={()=>navigation.navigate('Sign Up')} ><Text style={{
           textAlign:"center",

       }}>Don't Have an Account ?</Text></TouchableOpacity>  
      
      </View>

    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: "green",
    margin: 10
  },
  box: {
    alignItems: "center",
  },
  box2: {
    paddingHorizontal:40,
    justifyContent:"space-evenly",
    // paddingTop:"10%",
    marginTop:"40%",
    height:"60%"
  },
});
