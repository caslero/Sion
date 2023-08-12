import './index.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { db, getTareas } from './index.js';

let mostrarT = await getTareas();



let ver = document.querySelector('.ver');
//console.log(ver);


let nombreUsuario = '';
let t = '';




let registroUsuarios = document.getElementById('registrar');
// let uActivo = document.getElementById('usuarioLogueado');
// let mostrar = document.querySelector('.mostrar');

registroUsuarios.addEventListener('click', registrar);

function registrar() {
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    let nombre = document.getElementById('nombre').value;

    const auth = getAuth();
        //let usuarioLogueado = document.getElementById('usuarioLogueado').value;

         mostrarT.forEach((doc) => {
              
             nombreUsuario = doc.data().Correo;
             t = doc.data().Usuario;
            
             if (correo === nombreUsuario) {
                 console.log('Usuario no esta disponible');

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
              } else {
                //console.log('Registro con exito');
                  addDoc(collection(db, "Usuarios"), {
                      Usuario: nombre,
                      Correo: correo
                    });
                    console.log("usuario registrado con exito: " + nombre);
                    let exito = document.querySelector('.exito');
                    exito.classList.remove('hidden')
                    
                    createUserWithEmailAndPassword(auth, correo, clave)
                    .then(() => {
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

         });


         

    document.getElementById('correo').value = '';
    document.getElementById('clave').value = '';
    document.getElementById('nombre').value = '';
      
}


 function observador() {
     const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
         //console.log(user.emailVerified);
         //aparece(user);
         if (user) {
             
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

         document.querySelector('.ocultar-validacion').innerHTML = `<div class="text-white">Usuario no registrado</div>`;

         //carlosjperazab@gmail.com
        //  console.log(errorCode);
        //  console.log(errorMessage);
    });
// [END auth_signin_password_modular]
}



observador();

