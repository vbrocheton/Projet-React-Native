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
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';

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
    setTimeout(() => setLoading(false), 1000);
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
    if (user) {
      fetchUser().then((r) => '');
    }
    fetchActeurs().then((r) => '');
    fetchSimilar().then((r) => '');
    fetchSerie().then((r) => '');
  }, [user]);

  const addToVu = () => {
    let toVu = [...currentUser.vu];
    toVu.push(serieToAdd);
    let vuRef = doc(db, 'User', currentUser.id);
    setDoc(vuRef, { vu: toVu }, { merge: true });
    setCurrentUser({...currentUser, vu : toVu});
  };

  const addToAVoir = () => {
    let toAVoir = [...currentUser['a_voir']];
    toAVoir.push(serieToAdd);
    let Avoir = doc(db, 'User', currentUser.id);
    setDoc(Avoir, { a_voir: toAVoir }, { merge: true });
    setCurrentUser({...currentUser, a_voir : toAVoir});
  };

  const addToFav = () => {
    let toFav = [...currentUser.fav];
    toFav.push(serieToAdd);
    let favRef = doc(db, 'User', currentUser.id);
    setDoc(favRef, { fav: toFav }, { merge: true });
    setCurrentUser({...currentUser, fav : toFav});
  };

  const deleteFromFav = () => {
    let toFav = [...currentUser.fav];
    let newFav = [...toFav].filter((item) => item.id != serieToAdd.id);
    let Doc = doc(db, 'User', currentUser.id);
    setDoc(Doc, { fav: newFav }, { merge: true });
    setCurrentUser({...currentUser, fav : newFav});
  };

  const deleteFromVoir = () => {
    let toAVoir = [...currentUser.a_voir];
    let newToAVoir = [...toAVoir].filter((item) => item.id !== serieToAdd.id);
    let Doc = doc(db, 'User', currentUser.id);
    setDoc(Doc, { a_voir: newToAVoir }, { merge: true });
    setCurrentUser({...currentUser, a_voir : newToAVoir});
  };

  const deleteFromVu = () => {
    let toVu = [...currentUser.vu];
    let newToVu = [...toVu].filter((item) => item.id !== serieToAdd.id);
    let Doc = doc(db, 'User', currentUser.id);
    setDoc(Doc, { vu: newToVu }, { merge: true });
    setCurrentUser({...currentUser, vu : newToVu});
  };

  const containsObject = (obj, list) => {
    for (let index = 0; index < list.length; index++) {
      const l = list[index];
      if (l.id == obj) {
        return true;
      }
    }

    return false;
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
                {(containsObject(serieToAdd.id, currentUser.vu) && (
                  <TouchableOpacity onPress={deleteFromVu} style={styles.button}>
                    <Text style={{textAlign:'center'}}>Retirer des Vu</Text>
                  </TouchableOpacity>
                )) || (
                  <TouchableOpacity onPress={addToVu} style={styles.button}>
                    <Text style={{textAlign:'center'}}>Vu</Text>
                  </TouchableOpacity>
                )}

                {(containsObject(serieToAdd.id, currentUser['a_voir']) && (
                  <TouchableOpacity onPress={deleteFromVoir} style={styles.button}>
                    <Text style={{textAlign:'center'}}>Retirer des à voir</Text>
                  </TouchableOpacity>
                )) || (
                  <TouchableOpacity onPress={addToAVoir} style={styles.button}>
                    <Text style={{textAlign:'center'}}>A Voir</Text
                  </TouchableOpacity>
                )}

                {(containsObject(serieToAdd.id, currentUser.fav) && (
                  <TouchableOpacity onPress={deleteFromFav} style={styles.button}>
                    <Text style={{textAlign:'center'}}>Retirer des Favoris</Text>
                  </TouchableOpacity>
                )) || (
                  <TouchableOpacity onPress={addToFav} style={styles.button}>
                    <Text style={{textAlign:'center'}}>Favoris</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            <Text>
              Première diffusion :{' '}
              {new Date(serie.first_air_date).toLocaleDateString('fr')}
            </Text>
            <Text>
              Genre :{' '}
              {serie.genres.map(({ name }, index) => {
                {
                  name;
                }
                {
                  index === serie.genres.length - 1 ? '' : ',';
                }
                {
                  (' ');
                }
              })}
            </Text>
            <Text>
              Crée par :{' '}
              {serie.created_by.map(({ name }, index) => {
                {
                  name;
                }
                {
                  index === serie.created_by.length - 1
                    ? ''
                    : index === serie.created_by.length - 2
                    ? ' &'
                    : ',';
                }
                {
                  (' ');
                }
              })}
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
    marginBottom: 25,
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
   button: {
      backgroundColor: '#ecc19c',
      marginBottom: 30,
      width:90,
      height: 40,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'space-evenly',
    },
});

export default Serie;
