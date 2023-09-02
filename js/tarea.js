//alert('hola')

import './index.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { auth, db } from './index.js';
//import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
import { getTareas, getTareasGuardadas, onGetTareas, borrarTarea, tareaActualizada, borrarLista } from './index.js'

let mostrarTareasRestantes = document.querySelector('.ocultare');


// let redireccionar = document.querySelector('.eliminarTodo');
//       redireccionar.classList.add('hidden');

let a = document.querySelector('.a');
let usuarioLogueado = document.getElementById('usuarioLogueado').value;




a.classList.remove('b')


let nombreUsua = document.getElementById('nombreUsua').value;

let cerrarSesion = document.getElementById('cerrarSesion');

cerrarSesion.addEventListener('click', logOut);
let verTareasActivas = document.getElementById('mostrarTareas');


let mostrarT = await getTareas();
let todasTareas = await getTareasGuardadas();

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

let btnEliminar = document.querySelector('.btnEliminar');





async function mostrarTareasUsuarioActivo(user) {


  let uActivo = user.email;
  let tarea = '';
  let tareass = '';
  let idTarea = '';
  let statusTarea = '';
  let claseTarea = '';
  let cantidadTareas = [];
  let contador = 0;
  let contadorClase = 0;


  const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
  const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {     

      contador++;

      tareass = doc.data().Tarea
      idTarea = doc.data().id
      claseTarea = doc.data().clase
      statusTarea = doc.data().status
      // doc.data() is never undefined for query doc snapshots
      tarea = tarea +  `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}">
                                       <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
                                         <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${doc.id}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                         <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
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



      if (claseTarea == 'marcar') {
        contadorClase++;
        cantidadTareas.push({n: idTarea})
      } 
      //console.log(doc.id, " => ", doc.data());
      
      document.getElementById('mostrarTareas').innerHTML = tarea;
      
    });


   
              

               if (contador == 0) {
                 document.getElementById('mostrarTareas').innerHTML = '';
               }
              
              
                 if (cantidadTareas.length != 0) {
                   document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
                 } else {
                   document.querySelector('.btnMarcar').innerHTML = ''
                 }
                
                 if (contador >= 1) {
                   document.querySelector('.btnEliminarTodo').innerHTML = `<button id="${idTarea}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
                   document.querySelector('.sinTareas').innerHTML = `<div class="mr-4 borrarTodo tareas"><b class="me-2">${contador}</b> Tareas activas</div>`;
                   
                 } else {
                   document.querySelector('.sinTareas').innerHTML = `<div class="borrarTodo tareas"><b class="me-2">${contador}</b> Tareas activas</div>`;
                   document.querySelector('.btnEliminarTodo').innerHTML = '';
                }



  
}

















// function s(){  
//   ocultar.classList.add('hidden')
//   document.getElementById('mostrarTareas').innerHTML = '';
// }


let n = 0;
function observador() {  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {

      let nombre = user.email
      let nombre2 = '';
      //redireccionar.classList.remove('hidden');
      document.getElementById('usuarioLogueado').value = user.email;

      mostrarT.forEach(doc => {
        nombre2 = doc.data().Correo;
        if (nombre === nombre2) {
          document.getElementById('nombreUsua').value = doc.data().Usuario;
        }
        
      })
    
      document.addEventListener("keypress", contarCerrarSesion);
      document.addEventListener("click", contarCerrarSesion);
      document.addEventListener('mousemove', contarCerrarSesion)     
      
      mostrarTareasUsuarioActivo(user);


    setTimeout(function(){
         logOut()
    }, 14400000);
    } else {      
      let redireccionar = document.querySelector('.eliminarTodo');
      redireccionar.classList.add('hidden');
      location = 'index.html';
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
   
    try {
      let usuarioLogueado = document.getElementById('usuarioLogueado').value;
      const docRef = await addDoc(collection(db, "Tareas"), {
        id: Date.now(),
        Usuario: usuarioLogueado,
        Tarea: agregarTarea,
        status: "pending",
        clase: "desmarcar"
      });
      //console.log("Identificador de la tarea registrada: ", docRef.id);
      document.getElementById('agregarTarea').value = '';
      
      observador()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};


document.addEventListener('keyup', guardarNuevaTarea2)
async function guardarNuevaTarea2(event) {
  
  let agregarTarea = document.getElementById('agregarTarea').value;
  
  if(event.key == 'Enter') {
    if (agregarTarea) {
      try {
        let usuarioLogueado = document.getElementById('usuarioLogueado').value;
        const docRef = await addDoc(collection(db, "Tareas"), {
          id: Date.now(),
          Usuario: usuarioLogueado,
          Tarea: agregarTarea,
          status: "pending",
          clase: "desmarcar"
        });
        //console.log("Identificador de la tarea registrada: ", docRef.id);
        document.getElementById('agregarTarea').value = '';
        
       observador()
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
};









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
sinCheckear.addEventListener('click', cambiarEstadoTarea);

async function cambiarEstadoTarea(e) {

  let uActivo = document.getElementById('usuarioLogueado').value;
  
  const statuTarea = e.target.closest('input[type="checkbox"]');
  const claseTarea = e.target.closest('input[type="checkbox"]');

  if (!statuTarea) return;    

  
    const status = statuTarea.checked ? "completed" : "pending"
    const clase = claseTarea.checked ? "marcar" : "desmarcar"
    let id = statuTarea.id;

    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id == id) {
        tareaActualizada(id, {status: status, clase: clase});
        observador()
      }
    });

   
       
}





















let editarTarea = document.querySelector('.checkear');
editarTarea.addEventListener('click', actualizarTareas);

function actualizarTareas(e) {

  let tarea = '';
  const botonEditarUnaTarea = e.target.closest(".js-edit");
 
  if (!botonEditarUnaTarea) return;

  //mostrarTareasRestantes.classList.remove('mostrar-ocultar'); 
    
    const id = botonEditarUnaTarea.id;
    const input = botonEditarUnaTarea.closest("li").querySelector('input[type="text"]');
  
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      console.log('Editando..');
    } else {
      input.setAttribute("readonly", "");     
      tarea = input.value; 

      tareaActualizada(id, {Tarea: tarea});
      console.log('Tarea Actualizada');
      mostrarTareasUsuarioActivo();
      // setTimeout(() => {
      //   mostrarTareasRestantes.classList.remove('mostrar-ocultar');
      //   
      //   mostrarTareasUsuarioActivo();
      // }, 100);
    }
}

let borrarIndividual = document.querySelector('.checkear');
borrarIndividual.addEventListener('click', eliminarElementos);

async function eliminarElementos(e)  {

  let uActivo = document.getElementById('usuarioLogueado').value;
  const borrarUnaTarea = e.target.closest(".js-delete");
  if (!borrarUnaTarea) return;

  let id = borrarUnaTarea.id;
  
    const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id == id) {
        borrarTarea(id)      
        observador()       
      }
    });
}


let borrarT = document.querySelector('.btnEliminar');
borrarT.addEventListener('click', eliminarListaCompleta);

async function eliminarListaCompleta(e) {
  
  let correoUsuarioActivo = document.getElementById('usuarioLogueado').value;
  let id = 0;
  const borrarTodasTarea = e.target.closest(".borrado");
  if (!borrarTodasTarea) return;

  const q = query(collection(db, "Tareas"), where("Usuario", "==", correoUsuarioActivo));  
  const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      id = doc.id;
        borrarLista(id)
        //observador()
    });
    observador()
}







let borrarMarcados = document.querySelector('.btnEliminar');
borrarMarcados.addEventListener('click', eliminarMarcados);



async function eliminarMarcados(e) {

  let correoUsuarioActivo = document.getElementById('usuarioLogueado').value;
  let clase = '';
  let id = 0;
  
  const borrarMarcado = e.target.closest(".marcado");
  if (!borrarMarcado) return; 
  
  const q = query(collection(db, "Tareas"), where("Usuario", "==", correoUsuarioActivo));  
  const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      
      id = doc.id;
      clase = doc.data().clase;
      
      if (clase == 'marcar') {
        borrarLista(id)
        observador()
      }
    })
 
       
}


function contarCerrarSesion(e) {
  if (e.target) {
    n = 0;
    window.setInterval(function(){      
      n++;
      if (n == 360000) {
        logOut();
      }
    }, 1000);
  } 
}



// async function tareasParaMostrar(user) {
  
//   // let uActivo = user.email;
//   // let tarea = '';
//   // let tareass = '';
//   // let idTarea = '';
//   // let statusTarea = '';
//   // let claseTarea = '';
//   // let cantidadTareas = [];
//   // let contador = 0;
//   // let contadorClase = 0;


//   // const q = query(collection(db, "Tareas"), where("Usuario", "==", uActivo));
  
//   // const querySnapshot = await getDocs(q);

//   //   querySnapshot.forEach((doc) => {

//   //     contador++;

//   //     tareass = doc.data().Tarea
//   //     idTarea = doc.data().id
//   //     claseTarea = doc.data().clase
//   //     statusTarea = doc.data().status
//   //     // doc.data() is never undefined for query doc snapshots
//   //     tarea = tarea +  `<li class="listare" id="${doc.id}" data-clase="${claseTarea}" data-status="${statusTarea}">
//   //                                      <label class="space-x-4 pl-2 md:pl-0 input-contenedor md:basis-[80%]">
//   //                                        <input id="${doc.id}" type="checkbox"  clase="sin-checkear cambiar" value="${idTarea}" ${statusTarea === "completed" ? "checked" : null}/>                       
//   //                                        <input id="${doc.id}" type="text" class="asa lista input-tarea outline-none" value="${tareass}" readonly>                            
//   //                                      </label>
//   //                                      <div class="btn-contenedore md:basis-[20%] md:px-5 pr-2 md:pr-0 space-x-2">
//   //                                        <button class="js-edit   circulos" id="${doc.id}">
//   //                                          <i class="ri-pencil-fill"></i>
//   //                                        </button>
//   //                                        <button class="js-delete circulos" id="${doc.id}">
//   //                                          <i class="ri-delete-bin-fill" title="Borrar Solo uno"></i>
//   //                                        </button>
//   //                                      </div>
//   //                                    </li>`;



//   //     if (claseTarea == 'marcar') {
//   //       contadorClase++;
//   //       cantidadTareas.push({n: idTarea})
//   //     } 
//   //     //console.log(doc.id, " => ", doc.data());
      
//   //     document.getElementById('mostrarTareas').innerHTML = tarea;
      
//   //   });


   
              

//   //              if (contador == 0) {
//   //                document.getElementById('mostrarTareas').innerHTML = '';
//   //              }
              
              
//   //                if (cantidadTareas.length != 0) {
//   //                  document.querySelector('.btnMarcar').innerHTML = `<button id="${idTarea}" class="${claseTarea} marcado borrarTodo">borrar marcados</button>`;
//   //                } else {
//   //                  document.querySelector('.btnMarcar').innerHTML = ''
//   //                }
                
//   //                if (contador >= 1) {
//   //                  document.querySelector('.btnEliminarTodo').innerHTML = `<div class="mr-4 borrarTodo">${contador} tarea activa</div><button id="${idTarea}" class="${claseTarea} borrado borrarTodo">borrar todo</button>`;
//   //                } else {
//   //                  document.querySelector('.btnEliminarTodo').innerHTML = `<div class="mr-4 borrarTodo">${contador} tarea activa</div>`;
//   //                }




// }

