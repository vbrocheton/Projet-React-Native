import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';
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
import { authentication } from '../firebase-auth';
import SerieItem from '../Components/SerieItem';

const Vu = () => {
  const [series, setSeries] = useState('');

  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    const q = query(
      collection(db, 'User'),
      where('mail', '==', authentication.currentUser.email),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let user = doc.data();
      user.id = doc.id;
      setSeries(user.vu);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchUser().then((r) => '');
  }, []);
  return (
    <>
      {loading && <View style={styles.loadingContent}><ActivityIndicator size={"large"}/></View>}
      {!loading && <FlatList
        numColumns={3}
          data={series}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <SerieItem serie={item.item} />}
        />}
    </>
  );
};

const styles = StyleSheet.create({
    loadingContent: {
        flex:1,
        height:'100%',
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Vu;
