import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { signOut, signInWithEmailAndPassword} from "firebase/auth";
import { authentication } from "../firebase-auth";

const Compte = ({navigation}) => {



    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signOut=() => {
    authentication.signOut().then(() => alert('Deconnexion'))
    }



    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >

    <View style={styles.buttonContainer2}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("AVoir")}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>À voir</Text>
                    </TouchableOpacity>
             </View>


    <View style={styles.buttonContainer2}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Vu")}
                    style={styles.button}
                    >
                      <Text style={styles.buttonText}>Vu</Text>
                    </TouchableOpacity>
             </View>



<View style={styles.buttonContainer2}>
                <TouchableOpacity
                onPress={() => navigation.navigate("Favoris")}
                style={styles.button}
                >
                  <Text style={styles.buttonText}>Favoris</Text>
                </TouchableOpacity>
         </View>




         <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={signOut}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Deconnexion</Text>
                </TouchableOpacity>
         </View>


    </KeyboardAvoidingView>
)};

export default Compte;

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
    marginTop: 50,
  },
  buttonContainer2: {
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
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
