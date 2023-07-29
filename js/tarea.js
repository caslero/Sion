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
let idTarea = '';
let statusTarea = '';
let claseTarea = '';


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

              let idTarea = '';
              let statusTarea = '';
              let claseTarea = '';



                 mostrarTareas.forEach((doc) => {
                   uActivo = doc.data().Usuario
                   if (uActivo === name) {

                    tareass =  doc.data().Tarea
                    statusTarea = doc.data().status;
                    claseTarea = doc.data().clase;
                    idTarea = doc.data().id;
                     tarea = tarea +  `<li class="listare" data-clase="${claseTarea}" data-status="${statusTarea}">
                                          <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
                                            <input type="checkbox"  clase="sin-checkear" id="${idTarea}" value="${idTarea}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                            <input id="lista" class="asa lista input-tarea outline-none" type="text" value="${tareass}" readonly>                            
                                          </label>
                                          <div class="btn-contenedore md:basis-[20%] md:px-5 pr-2 md:pr-0 space-x-2">
                                           <button class="js-edit circulos">
                                                 <i class="ri-pencil-fill"></i>
                                               </button>
                                               <button class="js-delete circulos">
                                                 <i class="ri-delete-bin-fill" title="Borrar Solo uno"></i>
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
            a.innerHTML = `<h1>Error!!! Debe Iniciar Sesion</h1>
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
              id: Date.now(),
              Usuario: usuarioLogueado,
              Tarea: agregarTarea,
              status: "pending",
              clase: "desmarcar"
            });
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('agregarTarea').value = '';
            mostrarTareasUsuarioActivo();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          //document.getElementById('mostrarTareas').innerHTML = ''; 
         

});


document.addEventListener('keyup', async function(event) {
  if(event.key == 'Enter') {
 
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
              id: Date.now(),
              Usuario: usuarioLogueado,
              Tarea: agregarTarea,
              status: "pending",
              clase: "desmarcar"
            });

            document.getElementById('agregarTarea').value = '';
            console.log("Document written with ID: ", docRef.id);
            
            mostrarTareasUsuarioActivo();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          //document.getElementById('mostrarTareas').innerHTML = ''; 
        }

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


let sinCheckear = document.querySelector('.checkear');
sinCheckear.addEventListener('click', updateStatus);
let todos = [];

function updateStatus(e) {

  mostrarT.forEach((doc) => {
    todos.push({
      id: doc.data().id,
      Usuario: doc.data().Usuario,
      Tarea: doc.data().Tarea,
      status: "pending",
      clase: "desmarcar"      
    })
  });

  let a = todos;
  
  const $status = e.target.closest('input[type="checkbox"]');
  const $clase = e.target.closest('input[type="checkbox"]');

  if (!$status) return;

  const $li = $status.closest("li"),
         id = $li.dataset.id,
    status = $status.checked ? "completed" : "pending",
    clase = $clase.checked ? "marcar" : "desmarcar",
     currentIndex = a.findIndex((todo) => todo.id == id);

   $li.dataset.status = status;
   $li.dataset.clase = clase;

   a[currentIndex].status = status;
   a[currentIndex].clase = clase;

  //eliminarMarcados();
}