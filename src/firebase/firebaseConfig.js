// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA1imLO9Ja3K_ybMqXobWMUyU0so-KD3wE',
  authDomain: 'cashnet-fb028.firebaseapp.com',
  projectId: 'cashnet-fb028',
  storageBucket: 'cashnet-fb028.appspot.com',
  messagingSenderId: '422620993496',
  appId: '1:422620993496:web:d84e53089464250a0544ad',
  measurementId: 'G-9DDDMH1RHG',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// auth é para pegar a autenticação do firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
