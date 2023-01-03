import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Home = ({navigation}) => (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
        <Text>Solarized</Text>
      </TouchableOpacity>
    </View>
);

export default Home;
