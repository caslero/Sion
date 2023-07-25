import './index.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';


let ver = document.querySelector('.ver');
console.log(ver);







let registroUsuarios = document.getElementById('registrar');
let uActivo = document.getElementById('usuarioLogueado');
let mostrar = document.querySelector('.mostrar');

registroUsuarios.addEventListener('click', registrar);

function registrar() {
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    let nombre = document.getElementById('nombre').value;

    const auth = getAuth();
        //let usuarioLogueado = document.getElementById('usuarioLogueado').value;

        addDoc(collection(db, "Usuarios"), {
            Usuario: nombre,
            Correo: correo
          });
          console.log("usuario registrado con exito: " + nombre);
       
    createUserWithEmailAndPassword(auth, correo, clave)
    .then(() => {
       verificar();
    }).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
    });
    //console.log(correo, clave);
}


let registroUsuarios1 = document.getElementById('registrar1');

registroUsuarios1.addEventListener('click', entrarSistema);

function entrarSistema() {
    let correo1 = document.getElementById('correo1').value;
    let clave1 = document.getElementById('clave1').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, correo1, clave1)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const usuario = user.email;
        

        location = 'tarea.html'
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
// [END auth_signin_password_modular]
}

function observador() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            aparece(user);
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log(uid);
           
            console.log('Usuario Activo');

            // ...
            } else {
            // User is signed out
            console.log('Ningun usuario activo');
            // ...
        }
    });
}



function aparece(user) {
    let user1 = user;
    
     const usuario = user.email;
    

    if(user1.emailVerified) {
       console.log('Usuario Verificado Con Exito');
    }
    
}


function verificar() {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
    .then(() => {
        // Email verification sent!
        // ...
        console.log('Enviando Correo');
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}


observador();
