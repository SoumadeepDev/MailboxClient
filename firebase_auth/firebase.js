// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGP9CxpZoib8L5VXhReE8Dh1Evb3KnkD8",
  authDomain: "mailboxclient-f5b6a.firebaseapp.com",
  projectId: "mailboxclient-f5b6a",
  storageBucket: "mailboxclient-f5b6a.appspot.com",
  messagingSenderId: "430133247906",
  appId: "1:430133247906:web:960e50121d24341cfb7cfb",
  measurementId: "G-SHV1L92LXB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
