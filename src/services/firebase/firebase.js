import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMrKvvYBziy8JXJiLjdkxZXWiALY3J0pw",
  authDomain: "slaskie-centrum-stolarskie.firebaseapp.com",
  databaseURL: "https://slaskie-centrum-stolarskie.firebaseio.com",
  projectId: "slaskie-centrum-stolarskie",
  storageBucket: "slaskie-centrum-stolarskie.appspot.com",
  messagingSenderId: "384289542422",
  appId: "1:384289542422:web:91552307b308d2909d8037",
  measurementId: "G-XLYTNSYS20",  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* function validateMe(){
  firebase
        .auth()
        .signinwithemailandpassword("lewapoel@gmail.com", "74150925")
  } */

export const db = firebase.firestore();

export const storage = firebase.storage().ref();

export default firebase;