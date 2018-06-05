import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCw1IJAcQmbNhTC1qjKl9EbtChc4wmmE00",
    authDomain: "phc-map.firebaseapp.com",
    databaseURL: "https://phc-map.firebaseio.com",
    projectId: "phc-map",
    storageBucket: "phc-map.appspot.com",
    messagingSenderId: "701662341649"
};
firebase.initializeApp(config);
export default firebase;
