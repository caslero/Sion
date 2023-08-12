//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas, borrarTarea, cambiarTarea, tareaActualizada} from './index.js'
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
                    tarea = tarea +  `<li class="listare" id="${idTarea}" data-clase="perro" data-status="${statusTarea}">
                                          <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
                                            <input type="checkbox"  clase="sin-checkear" id="${idTarea}" value="${idTarea}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                            <input id="${idTarea}" class="asa lista input-tarea outline-none" type="text" value="${tareass}" readonly>                            
                                          </label>
                                          <div class="btn-contenedore md:basis-[20%] md:px-5 pr-2 md:pr-0 space-x-2">
                                              <button class="js-edit   circulos" id="${doc.id}">
                                                <i class="ri-pencil-fill"></i>
                                              </button>
                                              <button class="js-delete circulos" id="${doc.id}">
                                                <i class="ri-delete-bin-fill" title="Borrar Solo uno"></i>
                                              </button>
                                          </div>
                                      </li>`;

                                      
                   
                   }
                
                 })
                 //console.log('las tareas son r: ' + tarea);
                
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
  document.getElementById('mostrarTareas').innerHTML = '';
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

      // function aparece(user) {
         let user1 = user;
      //    const usuario = user.email;    
    
        if(user1.emailVerified == false) {
           console.log('Usuario no Verificado');
           location = 'index.html';
        } else {
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
            // console.log('Ningun usuario activo');
            // a.innerHTML = `<h1>Error!!! Debe Iniciar Sesion</h1>
            //                 <a class="c" href="index.html">Inicie Sesion</a>
            // `;

            location = 'index.html';
           
           
            a.classList.add('b')

            // ...
        }
        }      
    });
}




let guardarTarea = document.getElementById('guardarTarea');


//let rTarea = document.getElementById('rTarea');
//guardarTarea.addEventListener('click', async (e) => {
guardarTarea.addEventListener('click', guardarNuevaTarea);

async function guardarNuevaTarea() { 
  let agregarTarea = document.getElementById('agregarTarea').value;
  
  if (agregarTarea) {
    s();
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
      console.log("Identificador de la tarea registrada: ", docRef.id);
      document.getElementById('agregarTarea').value = '';
      
      mostrarTareasUsuarioActivo();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};


document.addEventListener('keyup', async function(event) {
  
  let agregarTarea = document.getElementById('agregarTarea').value;
  
  if(event.key == 'Enter') {
    if (agregarTarea) {
      s();
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
        console.log("Identificador de la tarea registrada: ", docRef.id);
        document.getElementById('agregarTarea').value = '';
        
        mostrarTareasUsuarioActivo();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
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

 
  
  const $status = e.target.closest('input[type="checkbox"]');
  const $clase = e.target.closest('input[type="checkbox"]');

  if (!$status) return;

  const $li = $status.closest("li"),
         id = $li.dataset.id,
    status = $status.checked ? "completed" : "pending",
    clase = $clase.checked ? "marcar" : "desmarcar",
     currentIndex = todos.findIndex((todo) => todo.id == id);

   $li.dataset.status = status;
   $li.dataset.clase = clase;

   todos[currentIndex].status = status;
   todos[currentIndex].clase = clase;

  //eliminarMarcados();
}

















let editarTarea = document.querySelector('.checkear');
editarTarea.addEventListener('click', actualizarTareas);

async function actualizarTareas(e) {

  let id = '';
  let usuario = '';
  let tarea = '';
  let status = '';
  let clase = '';

  const editarUnaTarea = e.target.closest(".js-edit");
  if (!editarUnaTarea) return;

  // let doc = await cambiarTarea(editarUnaTarea.id);
  
  // id = doc.data().id;
  // usuario = doc.data().Usuario;
  // tarea = doc.data().Tarea;
  // status = doc.data().status;
  // clase = doc.data().clase;

  let input = editarUnaTarea.closest("li").querySelector('input[type="text"]');
  

    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      console.log('Editando');
      console.log(editarUnaTarea.id);
    } else {
      input.setAttribute("readonly", "");
      console.log('Editado Correctamente');
      console.log(editarUnaTarea.id);
      //tareaActualizada(editarUnaTarea.id, {id: id, Tarea:input});
    }
   //input.addEventListener("keyup", tareaActualizada(doc.data().id));
   //input.addEventListener("keyup", tareaActualizada(editarUnaTarea.id, {id: id, Usuario: usuario, Tarea: input, status: status, clase: clase}));
}






let borrarIndividual = document.querySelector('.checkear');
borrarIndividual.addEventListener('click', eliminarElementos);

function eliminarElementos(e)  {
  const borrarUnaTarea = e.target.closest(".js-delete");
  if (!borrarUnaTarea) return;
  console.log('Borrando...');  
  borrarTarea(borrarUnaTarea.id)
  mostrarTareasUsuarioActivo();  
}