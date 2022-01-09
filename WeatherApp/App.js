import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import SearchCity from './components/SearchCity';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// const MainTabScreen = ()=>{
//     return (
//       <NavigationContainer>
//         <Tab.Navigator
//         initialRouteName="Home"
//         activeColor="#e91e63"
//         barStyle={{ backgroundColor: 'tomato' }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color }) => (
//               <Icon name="ios-home" color={color} size={26} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Search"
//           component={SearchCity}
//           options={{
//             tabBarLabel: 'Search',
//             tabBarIcon: ({ color }) => (
//               <Icon name="ios-search" color={color} size={26} />
//             ),
//           }}
//         />
       
//       </Tab.Navigator>
//       </NavigationContainer>
//     );
//     }


//     export default MainTabScreen;


const Home = ()=>{
  return(
    <HomeScreen/>
  );
}


export default Home;