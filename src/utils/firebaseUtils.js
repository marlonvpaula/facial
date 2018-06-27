import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBM2xh2OZphX5IXwMo9AfXVpDvu0LB95JQ",
  authDomain: "facial-118ce.firebaseapp.com",
  databaseURL: "https://facial-118ce.firebaseio.com",
  projectId: "facial-118ce",
  storageBucket: "facial-118ce.appspot.com",
  messagingSenderId: "759547545253"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseStorage = firebase.storage();