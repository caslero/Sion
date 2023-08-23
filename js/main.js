import './index.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { db, getTareas } from './index.js';

let mostrarT = await getTareas();

let sesionActiva = document.querySelector('.sesionActiva');
sesionActiva.classList.add('hidden')

let ver = document.querySelector('.ver');
//console.log(ver);


let nombreUsuario = '';
let t = '';




let registroUsuarios = document.getElementById('registrar');
// let uActivo = document.getElementById('usuarioLogueado');
// let mostrar = document.querySelector('.mostrar');

registroUsuarios.addEventListener('click', registrar);

function registrar() {
    let msjUsuario = document.getElementById('registroExitosoUsuario');

    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    let nombre = document.getElementById('nombre').value;

    if (correo == '' || clave == '' || nombre == '') {
        console.log('error al registrar');
        document.getElementById('registroExitosoUsuario').innerHTML = 'Error al registrar' 
        
    } else {

    const auth = getAuth();
    //let usuarioLogueado = document.getElementById('usuarioLogueado').value;

    mostrarT.forEach((doc) => {          
         nombreUsuario = doc.data().Correo;
         t =  doc.data().Usuario;
    });

        if (correo === nombreUsuario) {
            msjUsuario.classList.remove('hidden');            
            msjUsuario.innerHTML = `<span>Usuario No disponible</span>`;

            setTimeout(function(){
                msjUsuario.classList.add('hidden');  
            }, 5000);

        }  else {
                 createUserWithEmailAndPassword(auth, correo, clave)
                 .then(() => {
                    addDoc(collection(db, "Usuarios"), {
                        Usuario: nombre,
                        Correo: correo
                    });
                      
                    msjUsuario.classList.remove('hidden');
                    msjUsuario.innerHTML = `<span>Usuaio Registrado con exito</span>`;
                    
                    setTimeout(function(){
                        location = 'index.html';
                    }, 5000);

                      let exito = document.querySelector('.exito');
                      exito.classList.remove('hidden')

                      verificar();
                      location = 'index.html'
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
        document.getElementById('correo').value = '';
        document.getElementById('clave').value = '';
        document.getElementById('nombre').value = '';
        return;
        
    }

      
}


function observador() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            sesionActiva.classList.add('hidden')
            location = "tarea.html"
            const uid = user.uid;
        } else {            
            sesionActiva.classList.remove('hidden')
        }
    });
}



// function aparece(user) {
//     let user1 = user;
//      const usuario = user.email;    
//     console.log(user1.emailVerified);
//     if(user1.emailVerified == false) {
//        console.log('Usuario no Verificado');
//        //location = 'index.html';
//     }
    
// }

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




// let reVerificar = document.getElementById('reVerificar');
// reVerificar.addEventListener('click', nuevaVerificacion);

// function nuevaVerificacion () {
//     let correo1 = document.getElementById('correo1').value;
//     let clave1 = document.getElementById('clave1').value;
//     const auth = getAuth();

  

//      signInWithEmailAndPassword(auth, correo1, clave1)
//          .then((userCredential) => {
//          // Signed in 
//          const user = userCredential.user;
//          const usuario = user.email;
//         console.log(user.emailVerified);

//         if (user.emailVerified == true) {
//             location = 'tarea.html'
//         } else {
//             console.log('Error debe validar el correo enviado');
//         }
//          // ...
//      })
   
// }



let registroUsuarios1 = document.getElementById('registrar1');

registroUsuarios1.addEventListener('click', entrarSistema);

function entrarSistema() {
    let correo1 = document.getElementById('correo1').value;
    let clave1 = document.getElementById('clave1').value;
    const auth = getAuth();

    if (correo1) {
        signInWithEmailAndPassword(auth, correo1, clave1)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const usuario = user.email;
       console.log(user.emailVerified);

       if (user.emailVerified == true) {
           location = 'tarea.html';
           let ocultarValidacion = document.querySelector('.ocultar-validacion');
           ocultarValidacion.classList.add('hidden');
       } else {
           console.log('Error debe validar el correo enviado');
           document.getElementById('validar').innerHTML = `<div class="validar-correo">Debe validar el correo</div>
                                                           <div class="validar-correo" id="nuevoCodigo">Enviar Nuevo Codigo</div>
                                                           `;
           
           let nuevoCodigo = document.getElementById('nuevoCodigo');
           nuevoCodigo.addEventListener('click', reenviarCodigo);
                                                           
           function reenviarCodigo() {
               console.log('Hola nuevo codigo');

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
       }
       // ...
       }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        document.querySelector('.ocultar-validacion').innerHTML = `<div class="text-white">Error al registrar</div>`;

        //carlosjperazab@gmail.com
       //  console.log(errorCode);
       //  console.log(errorMessage);
   });
// [END auth_signin_password_modular]
        
    } else {
        console.log('campo de correo vacio');
    }

    
}

let claveOlvidada = document.getElementById('claveOlvidada');
claveOlvidada.addEventListener('click', cambiarClave);

function cambiarClave() {
    console.log('clave cambiada');
    let correo1 = document.getElementById('correo1').value;
    //let clave1 = document.getElementById('clave1').value;
    
    const auth = getAuth();
    sendPasswordResetEmail(auth, correo1)
    .then(() => {
        // Password reset email sent!
        // ..
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}



observador();

