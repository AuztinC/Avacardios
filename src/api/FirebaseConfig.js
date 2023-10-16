// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCVvDz65NXVsy5JqIOnUvAn01FJRQis9kQ",
    authDomain: "avacardios.firebaseapp.com",
    projectId: "avacardios",
  storageBucket: "avacardios.appspot.com",
  messagingSenderId: "500421970957",
  appId: "1:500421970957:web:b777bab71fcdcffbb6d944",
  measurementId: "G-PMZJ50RNK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app)
const firebaseProvider = new GithubAuthProvider()

export { firebaseAuth, firebaseProvider }