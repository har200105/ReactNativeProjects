import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';


const AppBar = (props)=>{
    return(
        <Appbar.Header style={{marginTop:30}}>
      <Appbar.Content title="Weather Now" subtitle={props.title}  style={{alignItems:"center"}}/>
    </Appbar.Header>
    );
}


export default AppBar;