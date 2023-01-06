import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import imagesPath from '../Services/Images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SerieItem = ({ serie }) => {
  const navigate = useNavigation();

  return (
    <TouchableOpacity style={styles.main_container} onPress={() => navigate.navigate('Serie', {serie:serie.id})}>
      <Image
        style={styles.image}
        source={{ uri: imagesPath(serie.poster_path) }}
      />
      <View style={styles.under_text}>
        <Text style={styles.serie} numberOfLines={2}>{serie.name}</Text>
        <Text style={styles.note}>{serie.vote_average} / 10 <MaterialCommunityIcons name="star" /></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main_container: {
    height: 250,
    flexDirection: 'column',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    marginBottom:0,
    backgroundColor: 'gray',
  },
  under_text: {
    flex:1,
    flexDirection:"column",
    justifyContent:"space-between",
    textAlign:"center",
    fontSize:16,
    backgroundColor: '#ecc19c',
    marginLeft: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width:120,
    height:60,
  },
  note:{
    fontSize:12,
    marginTop:5,
    textAlign:"center",
          fontWeight: 'bold',
  },

  serie:{
      fontSize:15,
      marginTop:5,
      textAlign:"center"
    }
});

export default SerieItem;
