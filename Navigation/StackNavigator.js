import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import Home from '../Screens/Home';
import Serie from '../Screens/Serie';
import Connexion from '../Screens/Connexion';
import Compte from '../Screens/Compte';
import Inscription from '../Screens/Inscription';
import { useAuthentication } from '../Services/useAuth';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Retour',
};

const MainStackNavigator = ({ params }) => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name="Home" component={Home} options={{ title: 'Accueil' }} />
    <Stack.Screen name="Serie" component={Serie} />
  </Stack.Navigator>
);

const AccountStackNavigator = ({ params }) => {
  const { user } = useAuthentication();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {user ? (
        <Stack.Screen
          name="Mon Compte"
          component={Compte}
          options={{ title: 'Mon Compte' }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Connexion"
            component={Connexion}
            options={{ title: 'Connexion' }}
          />
          <Stack.Screen
            name="Inscription"
            component={Inscription}
            options={{ title: "S'inscrire" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export { MainStackNavigator, AccountStackNavigator };
