import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAnYaKsNVXQLJ4MQWSLH1EjdqxmPjXWO3U",
    authDomain: "linkmark-ebe333.firebaseapp.com",
    databaseURL: "https://linkmark-ebe333.firebaseio.com",
    projectId: "linkmark-ebe333",
    storageBucket: "linkmark-ebe333.appspot.com",
    messagingSenderId: "468777763159",
    appId: "1:468777763159:web:2999d7f6271aba78be3e12"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;