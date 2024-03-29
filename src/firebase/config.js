import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxJgsYjRaPZz5F2PsFgSN852oMcDRmGbU",
  authDomain: "vue-projects-9c7a2.firebaseapp.com",
  projectId: "vue-projects-9c7a2",
  storageBucket: "vue-projects-9c7a2.appspot.com",
  messagingSenderId: "396061258270",
  appId: "1:396061258270:web:351975855895a9718f340f",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth = firebase.auth();
let timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, timestamp };
