import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCqvfEuJaxr7TD9kRnAQ42iy3UeGO9d1FA",
  authDomain: "employee-crud-596c7.firebaseapp.com",
  databaseURL: "https://employee-crud-596c7-default-rtdb.firebaseio.com",
  projectId: "employee-crud-596c7",
  storageBucket: "employee-crud-596c7.appspot.com",
  messagingSenderId: "59094569197",
  appId: "1:59094569197:web:38810ae37ec8a79fbe3ce4",
  measurementId: "G-66YLEXYM85"
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();