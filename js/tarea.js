//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas} from './index.js'
let nombreUsuario = '';

let a = document.querySelector('.a');

a.classList.remove('b')
let usuarioLogueado = document.getElementById('usuarioLogueado').value;
let nombreUsua = document.getElementById('nombreUsua').value;

let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', logOut);
let verTareasActivas = document.getElementById('mostrarTareas');


let mostrarT = await getTareas();
let verTareas = await getTareasGuardadas();
let tareaGuardada = '';
let t = '';



//  window.addEventListener('DOMContentLoaded', async () => {
// //r()
 
// //     let mostrarT = await getTareas();
// //     let t = '';

// //   const auth = getAuth();
// //   onAuthStateChanged(auth, (user) => {
     
// //     if (user) {
// //         const uid = user.uid;            
// //         const name = user.email;
// //         console.log('Funcion ver');

// //         // mostrarT.forEach((doc) => {              
// //         //   nombreUsuario = doc.data().Correo;
// //         //   t = doc.data().Usuario;
        
// //         //     if (nombreUsuario === name) {
// //         //      let us = document.querySelector('.us');
// //         //      let usa = document.querySelector('.usa');
// //         //      us.classList.add('hidden')
// //         //      usa.classList.remove('hidden')
// //         //      document.getElementById('nombreUsua').value = t;
// //         let uActivo = '';
// //         let tarea = '';
// //         mostrarT.forEach((doc) => {
              
// //           nombreUsuario = doc.data().Correo;
// //             t = doc.data().Usuario;
// //             if (nombreUsuario === name) {
// //               let us = document.querySelector('.us');
// //               let usa = document.querySelector('.usa');
// //               us.classList.add('hidden')
// //               usa.classList.remove('hidden')
// //               document.getElementById('nombreUsua').value = t;            
            
// //             onGetTareas((mostrarTareas) => {
             
// //               mostrarTareas.forEach((doc) => {
                
// //                 uActivo = doc.data().Usuario
// //                 if (uActivo === name) {
// //                   tarea = tarea + `${doc.data().Tarea}<br><br>`;
                 
// //                 }
// //               })
// //               console.log('las tareas son r: ' + tarea);
// //               document.getElementById('mostrarTareas').innerHTML = tarea;
// //             })

              
// //                 // verTareas.forEach((doc) => {                        
// //                 //   if (nombreUsuario === doc.data().Usuario) {
// //                 //     tareaGuardada = `${doc.data().Tarea}<br><br>`;
// //                 //     console.log('hola tarea guardada 2 ' + tareaGuardada);
// //                 //   }
// //                 //  });
                              

// //             }
// //           });
// //     }    
// //   });
//  });
let ocultar = document.querySelector('.ocultare');
 function mostrarTareasUsuarioActivo() {
  ocultar.classList.remove('hidden')
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
       
    if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user

            const uid = user.uid;            
            const name = user.email;
            let uActivo = '';
            let tarea = '';
         
            
          
      mostrarT.forEach((doc) => {
              
                nombreUsuario = doc.data().Correo;
                t = doc.data().Usuario;
        if (nombreUsuario === name) {
                   let us = document.querySelector('.us');
                   let usa = document.querySelector('.usa');
                   us.classList.add('hidden')
                   usa.classList.remove('hidden')
                   document.getElementById('nombreUsua').value = t;


           
            console.log('Registro con exito');

            onGetTareas((mostrarTareas) => {
             let tareass = '';
                 mostrarTareas.forEach((doc) => {
                   uActivo = doc.data().Usuario
                   if (uActivo === name) {
                    tareass =  doc.data().Tarea
                     tarea = tarea +  `<li class="space-x-4 flex listar">
                          <label class="space-x-4 marcar">
                              <input type="checkbox"  clase=""/>                       
                              <input id="lista" class="asa lista listar-input" type="text" value="${tareass}" readonly>                            
                          </label>
                          <div class="actions">
                              <button class="js-edit">
                                  editar
                              </button>
                              <button class="js-delete">
                                 borrar
                              </button>
                          </div>
                      </li>`;
                   
                   }
                 })
                 console.log('las tareas son r: ' + tarea);
                 document.getElementById('mostrarTareas').innerHTML = tarea;
                 //document.getElementById('lista').value = tareass;

            });
        }
      });
    }
  });
}


function s(){
  
  ocultar.classList.add('hidden')
  document.getElementById('mostrarTareas').innerHTML = 'sas';
}




mostrarTareasUsuarioActivo();
      

// window.addEventListener('DOMContentLoaded', async () => {
//   onGetTareas((mostrarTareas) => {

//     mostrarTareas.forEach((doc) => {
//       let tarea = doc.data();
//       console.log(tarea.Tarea);
//     })
//   })

//   //   document.getElementById('mostrarTareas').innerHTML = `${tar}`;
// });



function observador() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
       
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user

            //const docRef = await addDoc(collection(db, "Usuarios"), {
              //let getTareas = () => getDocs(collection(db, 'Tareas'))

            //window.addEventListener('DOMContentLoaded', async () => {

            const uid = user.uid;            
            const name = user.email;
            let uActivo = '';
            let tarea = '';
            mostrarUsuarioActivo();
            
            function mostrarUsuarioActivo() {
              mostrarT.forEach((doc) => {
              
                nombreUsuario = doc.data().Correo;
                t = doc.data().Usuario;
                  if (nombreUsuario === name) {
                   let us = document.querySelector('.us');
                   let usa = document.querySelector('.usa');
                   us.classList.add('hidden')
                   usa.classList.remove('hidden')
                   document.getElementById('nombreUsua').value = t;

                  }
              });

            
            };


            
            document.getElementById('usuarioLogueado').value = name;
            //usuarioLogueado.innerHTML = name;
           
            console.log('Usuario Activo');
           

            // ...
            } else {
            // User is signed out
            console.log('Ningun usuario activo');
            a.innerHTML = `<h1>Error 404 Not Found</h1>
                            <a class="c" href="index.html">Inicie Sesion</a>
            `;
           
           
            a.classList.add('b')

            // ...
        }
    });
}



let guardarTarea = document.getElementById('guardarTarea');
//let rTarea = document.getElementById('rTarea');
guardarTarea.addEventListener('click', async (e) => {
  s()
    let agregarTarea = document.getElementById('agregarTarea').value;
     const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
        const nombres = user.email;
        document.getElementById('usuarioLogueado').value = nombres;
       
        });  

        try {
            let usuarioLogueado = document.getElementById('usuarioLogueado').value;
            const docRef = await addDoc(collection(db, "Tareas"), {
              Usuario: usuarioLogueado,
              Tarea: agregarTarea
            });
            console.log("Document written with ID: ", docRef.id);
            
            mostrarTareasUsuarioActivo();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          //document.getElementById('mostrarTareas').innerHTML = ''; 
         

});



function logOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Saliendo...');
    a.innerHTML = '';
    location = 'index.html';
    }).catch((error) => {
    // An error happened.
    console.log(error);
    });
}



observador();

// function r() {
  
//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
       
//     if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/auth.user

//             const uid = user.uid;            
//             const name = user.email;
//             let uActivo = '';
//             let tarea = '';
         
            
          
//       mostrarT.forEach((doc) => {
              
//                 nombreUsuario = doc.data().Correo;
//                 t = doc.data().Usuario;
//         if (nombreUsuario === name) {
//                    let us = document.querySelector('.us');
//                    let usa = document.querySelector('.usa');
//                    us.classList.add('hidden')
//                    usa.classList.remove('hidden')
//                    document.getElementById('nombreUsua').value = t;


           
//             console.log('Registro con exito');

//             onGetTareas((mostrarTareas) => {
             
//                  mostrarTareas.forEach((doc) => {
//                    uActivo = doc.data().Usuario
//                    if (uActivo === name) {
//                      tarea = tarea + `${doc.data().Tarea}<br><br>`;
                   
//                    }
//                  })
//                  console.log('las tareas son r: ' + tarea);
//                  document.getElementById('mostrarTareas').innerHTML = tarea;
//             });
//         }
//       });
//     }
//   });
// }

//r()