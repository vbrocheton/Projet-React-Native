import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from 'react-navigation';
import imagesPath from '../Services/Images';
import SeriesRequest from '../Services/SeriesRequest';
import Acteur from '../Components/Acteur';
import SerieItem from '../Components/SerieItem';
import { useAuthentication } from '../Services/useAuth';
import { authentication } from '../firebase-auth';
import { db } from '../firebase-auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Serie = ({ route }) => {
  const id = route.params.serie;
  const { user } = useAuthentication();

  const [serie, setSerie] = useState('');
  const [loading, setLoading] = useState(true);
  const [acteurs, setActeurs] = useState('');
  const [similar, setSimilar] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const [serieToAdd, setSerieToAdd] = useState({
    id: '',
    name: '',
    poster_path: '',
    vote_average: '',
  });

  const fetchSerie = async () => {
    let data = await SeriesRequest.getSerie(id);
    setSerie(data);
    let toAdd = {
      id: data.id,
      name: data.name,
      poster_path: data.poster_path,
      vote_average: data.vote_average,
    };
    setSerieToAdd(toAdd);
    setTimeout(() => setLoading(false), 500);
  };

  const fetchActeurs = async () => {
    let data = await SeriesRequest.getCredits(id);
    setActeurs(data);
  };

  const fetchSimilar = async () => {
    let data = await SeriesRequest.getSimilar(id);
    setSimilar(data);
  };

  const fetchUser = async () => {
    const q = query(
      collection(db, 'User'),
      where('mail', '==', authentication.currentUser.email),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let user = doc.data();
      user.id = doc.id;
      setCurrentUser(user);
    });
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      fetchUser().then((r) => '');
    }
    fetchActeurs().then((r) => '');
    fetchSimilar().then((r) => '');
    fetchSerie().then((r) => '');
  }, []);

  const addToVu = () => {
    console.log(authentication.currentUser.email);
  };

  const addToAVoir = () => {
    console.log(serieToAdd);
  };

  const addToFav = () => {
    console.log(serieToAdd);
  };

  return (
    <>
      <ScrollView>
        {!loading ? (
          <>
            <Text style={styles.serieTitle}>{serie.name}</Text>
            <Image
              style={styles.image}
              source={{ uri: imagesPath(serie.poster_path) }}
            />
            {user && (
              <View style={styles.buttonList}>
                <TouchableOpacity onPress={addToVu}>
                  <Text>Vu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addToAVoir}>
                  <Text>A voir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addToFav}>
                  <Text>Favoris</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text>
              Première diffusion :{' '}
              {new Date(serie.first_air_date).toLocaleDateString('fr')}
            </Text>
            <Text>
              Genre :{' '}
              {serie.genres.map(({ name }, index) => (
                <>
                  {name}
                  {index === serie.genres.length - 1 ? '' : ','}{' '}
                </>
              ))}
            </Text>
            <Text>
              Crée par :{' '}
              {serie.created_by.map(({ name }, index) => (
                <>
                  {name}
                  {index === serie.created_by.length - 1
                    ? ''
                    : index === serie.created_by.length - 2
                    ? ' &'
                    : ','}{' '}
                </>
              ))}
            </Text>
            <Text>{serie.in_production ? 'En Production' : 'Terminée'}</Text>
            <Text>Nombre de saisons : {serie.number_of_seasons}</Text>
            <Text>Nombre d'épisodes : {serie.number_of_episodes}</Text>
            <Text>Résumé : </Text>
            <Text>{serie.overview}</Text>

            <Text style={styles.partie_title}>Les acteurs de la serie</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {acteurs.map((e) => (
                <Acteur key={e.id} acteur={e} />
              ))}
            </ScrollView>
            {similar !== undefined && (
              <View>
                <Text style={styles.partie_title}>Les séries similaires</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {similar.map((e) => (
                    <SerieItem key={e.id} serie={e} />
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        ) : (
          <Text>Chargement...</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  serieTitle: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 280,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  partie_title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Serie;
