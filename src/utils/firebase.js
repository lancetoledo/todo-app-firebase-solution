// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1MAg49N5XhMV-bXevtjN6WYmsfXjJz68",
  authDomain: "todoapp-c4714.firebaseapp.com",
  projectId: "todoapp-c4714",
  storageBucket: "todoapp-c4714.appspot.com",
  messagingSenderId: "586922473604",
  appId: "1:586922473604:web:f0ff874e9141b125316ad1",
  measurementId: "G-0G5X7CG982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()


export default db