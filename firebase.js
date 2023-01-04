
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxQKRNTfMPpqKwFBRG7nTWYjl8KhlasbA",
  authDomain: "fir-auth-8b17b.firebaseapp.com",
  projectId: "fir-auth-8b17b",
  storageBucket: "fir-auth-8b17b.appspot.com",
  messagingSenderId: "125653835835",
  appId: "1:125653835835:web:f873c7b3fa16462c06fc1e"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);




