import './index.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { db, getTareas } from './index.js';

let mostrarT = await getTareas();
let barraProgreso = document.getElementById('barraProgreso');
let registroUsuarios = document.getElementById('registrar');
let mostrarCirculo = document.getElementById('mostrarCirculo')

registroUsuarios.addEventListener('click', registrar);
mostrarCirculo.addEventListener('click', mostrarCirculoTareas)


function registrar() {
    let nombreUsuario = '';
    let msjUsuario = document.getElementById('registroExitosoUsuario');

    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    let nombre = document.getElementById('nombre').value;

    if (correo == '' || clave == '' || nombre == '') {
        barraDeProgreso()
        msjUsuario.classList.remove('viejoHidden');
        msjUsuario.classList.add('nuevoHidden');
        msjUsuario.innerHTML = '<div>Error, uno o varios campos vacios</div>'
        setTimeout(() => {
            msjUsuario.classList.add('viejoHidden');
            msjUsuario.innerHTML = '';
        }, "4000");
    } else {
        const auth = getAuth();
        
        mostrarT.forEach((doc) => {
            nombreUsuario = doc.data().Correo;
        });
        
        if (correo === nombreUsuario) {
            barraDeProgreso()
            msjUsuario.classList.remove('viejoHidden');
            msjUsuario.classList.add('nuevoHidden');         
            msjUsuario.innerHTML = `<span>Correo en uso</span>`;
            
            setTimeout(() => {
                msjUsuario.classList.add('viejoHidden');
                msjUsuario.innerHTML = '';
            }, "3000");
        }  else {
            barraDeProgreso()
            createUserWithEmailAndPassword(auth, correo, clave)
                .then(() => {
                addDoc(collection(db, "Usuarios"), {
                    id: Date.now(),
                    Usuario: nombre,
                    Correo: correo
                });
                
                msjUsuario.classList.remove('viejoHidden');
                msjUsuario.classList.add('nuevoHidden');
                msjUsuario.innerHTML = `<span>Usuario Registrado con exito</span>`;
                
                setTimeout(() => {
                    msjUsuario.classList.add('viejoHidden');
                    msjUsuario.innerHTML = '';
                }, "2000");
                
                verificar();
                setTimeout(function(){
                    barraDeProgreso()
                    location = 'login.html';
                }, 2000);
            }).then((userCredential) => {
                const user = userCredential.user;
            }).catch((error) => {
                barraDeProgreso()
                const errorCode = error.code;
                
                if (errorCode == 'auth/invalid-email') {
                    msjUsuario.classList.remove('viejoHidden');
                    msjUsuario.classList.add('nuevoHidden');
                    msjUsuario.innerHTML = `<span>Formato de correo Invalido</span>`;                       
                    
                    setTimeout(() => {
                        msjUsuario.classList.add('viejoHidden');
                        msjUsuario.innerHTML = '';
                    }, "3000");
                } else if (errorCode == 'auth/weak-password') {
                    msjUsuario.classList.remove('viejoHidden');
                    msjUsuario.classList.add('nuevoHidden');
                    msjUsuario.innerHTML = `<span>Clave debe ser mayor a 6 digitos</span>`;
                    
                    setTimeout(() => {
                        msjUsuario.classList.add('viejoHidden');
                        msjUsuario.innerHTML = '';
                    }, "3000");
                } else if (errorCode == 'auth/email-already-in-use') {
                    msjUsuario.classList.remove('viejoHidden');
                    msjUsuario.classList.add('nuevoHidden');
                    msjUsuario.innerHTML = `<span>Correo en uso</span>`;
                    
                    setTimeout(() => {
                        msjUsuario.classList.add('viejoHidden');
                        msjUsuario.innerHTML = '';
                    }, "3000");
                }
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
        document.getElementById('correo').value = '';
        document.getElementById('clave').value = '';
        document.getElementById('nombre').value = '';
    }
}

function observador() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified == true) {
                barraDeProgreso()
                location = "tarea.html"
                const uid = user.uid;
            } else {
                console.log('Usuario nulo: ');
            }
        }
    });
}

function verificar() {
    barraDeProgreso()
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


function barraDeProgreso() {
    barraProgreso.classList.remove('ocultarTarea');
  
    setTimeout(() => {
      barraProgreso.classList.add('ocultarTarea')
    }, 3000)
}


function mostrarCirculoTareas() {
    let seccionRegistrar = document.getElementById('seccionRegistrar');
    let seccionCirculo = document.getElementById('seccionCirculo');
    let margenCirculo = document.getElementById('margenCirculo');
    let centrarCirculo = document.getElementById('centrarCirculo');
    let mostrarOcultarCirculo = document.getElementById('mostrarOcultarCirculo');    

    seccionRegistrar.classList.toggle('flex')
    seccionRegistrar.classList.toggle('hidden')
    seccionCirculo.classList.toggle('basis-1/3')
    seccionCirculo.classList.toggle('basis-full')
    seccionCirculo.classList.toggle('h-[570px]')
    seccionCirculo.classList.toggle('h-[670px]')
   

    margenCirculo.classList.toggle('margenCirculo')
    margenCirculo.classList.toggle('margenCirculo2')

    centrarCirculo.classList.toggle('centar-contenido-circulo')
    centrarCirculo.classList.toggle('centar-contenido-circulo-movil')

    mostrarOcultarCirculo.classList.toggle('ri-arrow-left-s-line')
    mostrarOcultarCirculo.classList.toggle('ri-arrow-right-s-line')
}

observador();