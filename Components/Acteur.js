import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import imagesPath from '../Services/Images';

const Acteur = ({ acteur }) => {
  return (
    <>
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{ uri: imagesPath(acteur.profile_path) }}
        />
        <View style={styles.under_text}>
          <Text style={styles.acteur}>{acteur.name}</Text>
          <Text style={styles.character}>{acteur.character}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    height: 280,
    flexDirection: 'column',
  },
  image: {
    width: 120,
    height: 180,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: 'gray',
  },
  under_text: {
    backgroundColor: '#ecc19c',
    marginLeft: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width:120,
    height:90,
  },
  acteur:{
    fontWeight:'bold',
    textAlign:"center",
    marginTop:3
  },
  character:{
    fontSize:12,
    marginTop:5,
    textAlign:"center"
  }
});

export default Acteur;
