import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SerieItem from '../Components/SerieItem';
import SeriesRequest from '../Services/SeriesRequest';

const Home = ({ navigation }) => {
  const [popular, setPopular] = useState('');
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState('');
  const [onAir, setOnAir] = useState('');

  const fetchPopularSeries = async () => {
    let data = await SeriesRequest.getSeries();
    setPopular(data.results);
    setTimeout(()=>setLoading(false), 500 )
  };
  const fetchTopRatedSeries = async () => {
    let data = await SeriesRequest.getTopRatedSeries();
    setTop(data.results);
  };
  const fetchOnAirSeries = async () => {
    let data = await SeriesRequest.getOnAirSeries();
    setOnAir(data.results);
  };

  useEffect(() => {
    fetchTopRatedSeries().then((r) => '');
    fetchOnAirSeries().then((r) => '');
    fetchPopularSeries().then((r) => '');
  }, []);

  return <ScrollView showsVerticalScrollIndicator={false}>
        {!loading ? (<>
          <Text style={styles.sectionTitle}>Series populaires</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {popular.map((e) => <SerieItem key={e.id} serie={e}/>)}
          </ScrollView>
          <Text style={styles.sectionTitle}>Les mieux notés</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {top.map((e) => <SerieItem key={e.id} serie={e}/>)}
          </ScrollView>
          <Text style={styles.sectionTitle}>En Cours de diffusion</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {onAir.map((e) => <SerieItem key={e.id} serie={e}/>)}
          </ScrollView>
          </>
        ) : (
          <Text>Chargement...</Text>
        )}
    </ScrollView>
};

const styles = StyleSheet.create({
  sectionTitle:{
    color: '#A15C38',
    fontSize:20,
    fontFamily:"Helvetica",
    marginLeft:4,
    marginTop: 16
  }
})

export default Home;
