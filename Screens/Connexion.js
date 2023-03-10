import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase-auth"

const Connexion = ({navigation}) => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    function signIn() {

    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        alert('Vous êtes maintenant connecté');
        // ...
      })
      .catch((error) => {
        alert('Mauvais identifiant');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    }

    const goSignUp = () => {
      navigation.navigate('Inscription');
    }


    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <View style={styles.inputContainer}>
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
                  onPress={signIn}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Connexion</Text>
                </TouchableOpacity>
         </View>
         <TouchableOpacity onPress={goSignUp}>
          <Text>Si vous n'avez pas de compte, veuillez vous inscrire ici !</Text>
         </TouchableOpacity>

    </KeyboardAvoidingView>
)};

export default Connexion;

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
    backgroundColor: '#C3A6A0',
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
