import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

/** Esta es la conexion a la base de datos de firebase */
const firebaseConfig = {
  apiKey: "AIzaSyCYrrrvB_V8-UEqu2lWKg5YrKh5mip92dk",
  authDomain: "sion-a6d51.firebaseapp.com",
  projectId: "sion-a6d51",
  storageBucket: "sion-a6d51.appspot.com",
  messagingSenderId: "1021216432294",
  appId: "1:1021216432294:web:11a4c3c05073bc7a251467",
  measurementId: "G-QZTYVT7N17",
};

/** Aqui iniciamos las funcionas a utilizar, agregar, mostrar, editar y eliminar
 de la base de datos de firebase */
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export let getTareas = () => getDocs(collection(db, "Usuarios"));
export let getTareasGuardadas = () => getDocs(collection(db, "Tareas"));
export let onGetTareas = (callback) =>
  onSnapshot(collection(db, "Tareas"), callback);
export let borrarTarea = (id) => deleteDoc(doc(db, "Tareas", id));
export let borrarLista = (id) => deleteDoc(doc(db, "Tareas", id));
export let tareaActualizada = (id, nuevaT) =>
  updateDoc(doc(db, "Tareas", id), nuevaT);
