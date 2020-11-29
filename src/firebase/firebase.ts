import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyCn05vt1nroDg6Uy_If9RiaEGK1mIKBFBw",
    authDomain: "employee-crud-66e9a.firebaseapp.com",
    databaseURL: "https://employee-crud-66e9a.firebaseio.com",
    projectId: "employee-crud-66e9a",
    storageBucket: "employee-crud-66e9a.appspot.com",
    messagingSenderId: "1091455328136",
    appId: "1:1091455328136:web:8173d5c3a948a886dfe43d",
    measurementId: "G-YV7CQJPKSR"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);
  
  export default fireDb.database().ref();