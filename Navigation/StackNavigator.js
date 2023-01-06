import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import Home from '../Screens/Home';
import Serie from '../Screens/Serie';
import Connexion from '../Screens/Connexion';
import Compte from '../Screens/Compte';
import Inscription from '../Screens/Inscription';
import { useAuthentication } from '../Services/useAuth';
import Vu from '../Screens/Vu';
import AVoir from '../Screens/Avoir';
import Favoris from '../Screens/Favoris';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#262220',
      },
  cardStyle: {
  backgroundColor: '#F7F1F0'
  },
  headerTintColor: 'white',
  headerBackTitle: 'Retour',
  headerTitleAlign: 'center',
  headerTitleStyle: {
  fontWeight: 'bold',
  fontSize: 25
  }
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
        <>
          <Stack.Screen
            name="Mon Compte"
            component={Compte}
            options={{ title: 'Mon Compte' }}
          />
          <Stack.Screen
            name="Vu"
            component={Vu}
            options={{ title: 'Mes series Vu' }}
          />
          <Stack.Screen
            name="AVoir"
            component={AVoir}
            options={{ title: 'Mes series à voir' }}
          />
          <Stack.Screen
            name="Favoris"
            component={Favoris}
            options={{ title: 'Mes series favorites' }}
          />
        </>
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
