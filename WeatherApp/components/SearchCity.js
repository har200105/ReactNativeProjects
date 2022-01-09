import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { TextInput,Button } from 'react-native-paper';
import AppBar from './appbar';
import { StyleSheet, Text, View ,AsyncStorage} from 'react-native';

export default function SearchCity({navigation}) {

  const[text,setText] = useState("Biratnagar");  
  const Searching=()=>{
    navigation.navigate('Home',{City:text});
    // AsyncStorage.setItem("City",text);
  }
  return (
    <View style={styles.container}>
    <AppBar title="Search City"/>
    <TextInput
      label="City"
      value={text}
      onChangeText={text =>setText(text)}
    />
    <Button style={{margin:20}}   onPress={()=>Searching()}>Search</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
