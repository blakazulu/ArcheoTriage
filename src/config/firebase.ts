import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6kphOy9VYwGc5uENEKSsWTA-SJ_mhIvY",
  authDomain: "archeotriage.firebaseapp.com",
  projectId: "archeotriage",
  storageBucket: "archeotriage.firebasestorage.app",
  messagingSenderId: "119741082633",
  appId: "1:119741082633:web:92be016bd5ea6385371cd8",
  measurementId: "G-5758BWJFD5"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
