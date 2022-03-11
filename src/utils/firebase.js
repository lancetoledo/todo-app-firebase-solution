// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import the function
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC1MAg49N5XhMV-bXevtjN6WYmsfXjJz68",
//   authDomain: "todoapp-c4714.firebaseapp.com",
//   projectId: "todoapp-c4714",
//   storageBucket: "todoapp-c4714.appspot.com",
//   messagingSenderId: "586922473604",
//   appId: "1:586922473604:web:f0ff874e9141b125316ad1",
//   measurementId: "G-0G5X7CG982"
// };

// testconFig
const firebaseConfig = {
  apiKey: "AIzaSyBYOgZY2Xads8D_XoRTNQ4TByd55P1cZhQ",
  authDomain: "test-58fb6.firebaseapp.com",
  projectId: "test-58fb6",
  storageBucket: "test-58fb6.appspot.com",
  messagingSenderId: "74203155554",
  appId: "1:74203155554:web:edcd530051a8990035553b",
  measurementId: "G-G1JKQP313D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
// Holds all the functionality of authenticating a user
export const auth = getAuth(app)

export default db