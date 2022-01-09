import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from './screens/ChatScreen';
import firestore from '@react-native-firebase/firestore';
import ProfileScreen from './screens/ProfileScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'purple',
  },
};


const Stack = createStackNavigator();

const Navigation=({navigation})=> {
  const [user,setUser] = useState("");
  useEffect(()=>{
  const unregister =  auth().onAuthStateChanged(userExist =>{
      if(userExist){
        setUser(userExist);
        firestore().collection('user').doc(userExist.uid).update({
          status:"online"
        })
      }else{
        setUser("");
      }
    })

    return () =>{
      unregister();
    }
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerTintColor:"purple"
      }
      }
      >
      {
        user
         ?
         <>
         <Stack.Screen name="Home" options={{
           headerRight:()=><MaterialIcons name="account-circle"  size={34} color="purple" style={{
             marginRight:10
           }}
           onPress={()=>{
            }} 
           />,
           title:"Chat It !!"
         }}>{props=><HomeScreen {...props} user={user}/>}</Stack.Screen>
         <Stack.Screen name="Chat" options={({route})=>({title:<View><Text>{route.params.name}</Text><Text>{route.params.status}</Text></View>})}>
         { props=> <ChatScreen  {...props} user={user}/> }
         </Stack.Screen>


         <Stack.Screen name="Profile" >
         { props=> <ProfileScreen  {...props} user={user}/> }
         </Stack.Screen>
         </>
        :
        <>
      
        <Stack.Screen name="Log In" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{headerShown:false}} />
        </>
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
}





const App = () => {
  return (
    <>
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="purple" />
      <View style={styles.container}>
        <Navigation/>
      </View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'white',
  },
});

export default App;
