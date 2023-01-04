import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilmItem from '../Components/FilmItem';
import SeriesRequest from '../Services/SeriesRequest';

const Home = ({ navigation }) => {
  const [popular, setPopular] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPopularSeries = async () => {
    let data = await SeriesRequest.getSeries();
    setPopular(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchPopularSeries().then((r) => '');
  }, []);

  return <ScrollView showsVerticalScrollIndicator={false}>
        {!loading ? (<>
          <Text style={styles.sectionTitle}>Series populaires</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {popular.map((e) => <FilmItem film={e}/>)}
          </ScrollView>
          <Text style={styles.sectionTitle}>Les mieux notés</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {popular.map((e) => <FilmItem film={e}/>)}
          </ScrollView>
          <Text style={styles.sectionTitle}>En Cours de diffusion</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {popular.map((e) => <FilmItem film={e}/>)}
          </ScrollView>
          </>
        ) : (
          <Text>Chargement...</Text>
        )}
    </ScrollView>
};

const styles = StyleSheet.create({
  sectionTitle:{
    fontSize:30,
    fontFamily:"Helvetica",
    marginLeft:4,
    marginTop: 10
  }
})

export default Home;
