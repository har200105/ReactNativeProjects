import React, { useState } from 'react';
import { View, Text, Image, StyleSheet,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUpScreen({navigation}) {
  const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [image,setImage] = useState(null);
    const [showNext,setShowNext] = useState(false);
    const [loading,setLoading] = useState(false);

    
  if(loading){
    return <ActivityIndicator size="large" color="blue"/>
  }
  
 
  const userSignup = async() =>{
    setLoading(true);
  
    if(!email || !password || !name || !image){
      alert("Please Add All The Fields");
      return;
    }
    try{
    const result = await auth().createUserWithEmailAndPassword(email,password)
    firestore().collection('user').doc(result.user.uid).set({
      name:name,
      email:result.user.email,
      uid:result.user.uid,
      pic:image,
      status:"Online"
    });

    setLoading(false);
    console.log("Done");
  }catch(e){
    alert(e);
  } 
  }

  const profilePic = ()=>{
    launchImageLibrary({quality:0.5},(fileobj)=>{
      console.log(fileobj);
      const upploadPic = storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.uri);
      upploadPic.on('state_changed', 
  (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    if(progress==100){
      alert("Image Uploaded")
    }
   
  }, 
  (error) => {
    alert("Error Faced")
  }, 
  () => {
    upploadPic.snapshot.ref.getDownloadURL().then((downloadURL) => {
      setImage(downloadURL);
    });
  }
);

    })
  }
  
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box}>
        <Text style={styles.text}> Welcome to The Chat App By Harshit Rathi</Text>
      </View>

      <View style={styles.box2}>
       {!showNext &&
          <View>
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
          </View>
       }

       {
         showNext ? 
         <>
         <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          mode="outlined"
        />

        <Button mode="contained" onPress={()=>profilePic()}>Select Profile pic</Button>
        <Button mode="contained"  onPress={userSignup} disabled={image ? false : true} >Sign Up</Button>
        </>
        :
        <Button mode="contained"  onPress={()=>setShowNext(true)}>Next</Button>
       
      

         
       }

       <TouchableOpacity onPress={()=>navigation.navigate('Log In')}><Text style={{
        textAlign:"center",
    }}>Already Have An Account  ?</Text></TouchableOpacity>  
        
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
