import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Appbar, Button } from 'react-native-paper';

export default function App() {
  const [text, setText] = useState();
  const [text1, setText1] = useState();
  const [data, setData] = useState("Loading");

const CalculateLove= async()=> {
  fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${text}&sname=${text1}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "28ccafc39amshd05961978a01b69p1307eajsn68b50bedd3cc",
		"x-rapidapi-host": "love-calculator.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(res1=>{
  console.log(res1);
  setData(res1);
})
.catch(err => {
	console.error(err);
});
}

const Display = (props) =>{
  if(props.data=="Loading"){
  }else{
    return(
      <View >
      <Text style={{textAlign:"center",fontSize:20}}>{props.result.percentage}</Text>
      <Text style={{textAlign:"center" ,fontSize:15}}>{props.result.result}</Text>
      </View>
    );
  }
}


  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Love Calculator App" subtitle="Made By Harshit Rathi" />
      </Appbar.Header>
      <TextInput   

        label="Boy's Name"
        value={text}
        onChangeText={text => setText(text)}
      />

      <TextInput
        label="Girl's Name"
        value={text1}
        onChangeText={text => setText1(text)}
      />

      <Button mode="contained" onPress={()=>CalculateLove()} 
      style={{
        marginTop: 30,
        marginBottom:30,
        width: 250,
        marginLeft: 60
      }}>
        Calculate Your Love
  </Button>
  <Display result={data}/>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});






