import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
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

const Favoris = ({ params }) => {
  const [series, setSeries] = useState('');
  const fetchUser = async () => {
    const q = query(
      collection(db, 'User'),
      where('mail', '==', authentication.currentUser.email),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let user = doc.data();
      user.id = doc.id;
      setSeries(user.fav);
    });
  };

  useEffect(() => {
    fetchUser().then((r) => '');
  }, []);
  return (
    <View>
      <Text>Vu</Text>
    </View>
  );
};

export default Favoris;
