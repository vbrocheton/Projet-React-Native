import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MainStackNavigator, AccountStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = ({
    params,
}) => (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
      <Tab.Screen name="Main" component={MainStackNavigator}/>
      <Tab.Screen name="Compte" component={AccountStackNavigator}/>
    </Tab.Navigator>
);

export default TabNavigator;
