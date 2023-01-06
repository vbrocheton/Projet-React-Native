import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../firebase-auth"
import { addDoc, collection } from 'firebase/firestore';

const Inscription = () => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')

    const signUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        let newUser = {
          mail:email,
          nom:nom,
          prenom:prenom,
          vu:[],
          a_voir:[],
          fav:[]
        }
        let docRef = await addDoc(collection(db, "User"), newUser);

        alert('Vous êtes bien inscrit')

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });

      }


    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <View style={styles.inputContainer}>
        <TextInput
               placeholder="Nom"
               value={nom}
               onChangeText={(Text) => {setNom(Text)}}
               style={styles.input}
            />
            <TextInput
               placeholder="Prénom"
               value={prenom}
               onChangeText={(Text) => {setPrenom(Text)}}
               style={styles.input}
            />
            <TextInput
               placeholder="Email"
               value={email}
               onChangeText={(Text) => {setEmail(Text)}}
               style={styles.input}
            />

            <TextInput
               placeholder="Mot de passe"
               value={password}
               onChangeText={(Text) => {setPassword(Text)}}
               style={styles.input}
               secureTextEntry
            />

        </View>

         <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={signUp}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>Inscription</Text>
                </TouchableOpacity>
         </View>

    </KeyboardAvoidingView>
)};

export default Inscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
