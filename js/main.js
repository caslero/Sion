import './index.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

let registroUsuarios = document.getElementById('registrar');
let uActivo = document.getElementById('usuarioLogueado');
let mostrar = document.querySelector('.mostrar');

registroUsuarios.addEventListener('click', registrar);

function registrar() {
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;

    const auth = getAuth();

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

        mostrar.classList.remove('hidden');
        uActivo.innerHTML = `Bienvenido: <b>${usuario}</b>`;

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
     mostrar.classList.remove('hidden');
     const usuario = user.email;
     uActivo.innerHTML = `Bienvenido: <b>${usuario}</b>`;

    if(user1.emailVerified) {
       console.log('Usuario Verificado Con Exito');
    }
    
}

let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', sesionCerrada);

function sesionCerrada() {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Saliendo...');
    mostrar.classList.add('hidden');
    uActivo.innerHTML = '';

   
    //window.location.assign("index.html");
   


    }).catch((error) => {
    // An error happened.
    console.log(error);
    });
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
