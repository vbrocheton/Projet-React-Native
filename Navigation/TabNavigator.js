import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MainStackNavigator, AccountStackNavigator } from './StackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rechercher } from '../Screens/Rechercher';

const Tab = createBottomTabNavigator();

const TabNavigator = ({
    params,
}) => (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
      <Tab.Screen name="Main" component={MainStackNavigator} options={{
        tabBarLabel:"Accueil",
        tabBarIcon: () => <MaterialCommunityIcons name="home" size={20}/>
      }}/>
      <Tab.Screen name="Rechercher" component={Rechercher} options={{
        tabBarLabel:"Rechercher",
        tabBarIcon: () => <MaterialCommunityIcons name="magnify" size={20}/>
      }}/>
      <Tab.Screen name="Compte" component={AccountStackNavigator} options={{
        tabBarLabel:"Compte",
        tabBarIcon: () => <MaterialCommunityIcons name="account" size={20}/>
      }}/>
    </Tab.Navigator>
);

export default TabNavigator;
