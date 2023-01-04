import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import Home from '../Screens/Home';
import Serie from '../Screens/Serie';
import Connexion from '../Screens/Connexion';

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Retour",
  };

const MainStackNavigator = ({
    params,
}) => (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{title:"Accueil"}} />
      <Stack.Screen name="Serie" component={Serie} />
    </Stack.Navigator>
);

const AccountStackNavigator = ({
    params,
}) => (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Connexion" component={Connexion} options={{title:"Connexion"}} />
    </Stack.Navigator>
);


export {MainStackNavigator,AccountStackNavigator};


