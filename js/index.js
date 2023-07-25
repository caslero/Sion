// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {

  apiKey: "AIzaSyCYrrrvB_V8-UEqu2lWKg5YrKh5mip92dk",

  authDomain: "sion-a6d51.firebaseapp.com",

  projectId: "sion-a6d51",

  storageBucket: "sion-a6d51.appspot.com",

  messagingSenderId: "1021216432294",

  appId: "1:1021216432294:web:11a4c3c05073bc7a251467",

  measurementId: "G-QZTYVT7N17"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
