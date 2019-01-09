 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDgxkKsngXOwnJrXtfntsu82oF0tGF2h64",
    authDomain: "udemy-ninja-smoothies-aed88.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-aed88.firebaseio.com",
    projectId: "udemy-ninja-smoothies-aed88",
    storageBucket: "udemy-ninja-smoothies-aed88.appspot.com",
    messagingSenderId: "386558014785"
  };


 const firebaseApp =  firebase.initializeApp(config);
 firebaseApp.firestore().settings({timestampsInSnapshots: true})
 export default firebaseApp.firestore()